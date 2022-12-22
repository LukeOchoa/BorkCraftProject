package main

import (
	uuid "github.com/satori/go.uuid"
	//"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type Any interface{}

type NativeKey struct {
	Id         string
	Sessionid  string //uuid.UUID
	Lastactive string
	Expiration string
	Username   string
}

type nativenProfile struct {
	Key     string
	Profile nProfile
	Message string
}

type Key struct {
	Key string
}

type nProfile struct {
	Username  string
	Password  string
	Firstname string
	Lastname  string
	Role      string
}
type Session struct {
	Username     string
	Lastactivity string
	Sessionid    string
}

type Crud struct {
	table           string
	column          []string
	column_value    []string
	where           string
	where_condition string
}

// This is a testing function... Please delete later...
func messageJSON() []byte {
	//var message = map[string]string{
	//	"message": "There is Nothing to show!!!",
	//}

	var message = map[string]map[string]string{
		"message": {"message": "There is nothing to show???"},
	}

	r, err := json.Marshal(message)
	if err != nil {
		fmt.Println("Panic inside messageJSON/index/main @ json.Marshal() 2222 ... !")
		panic(err)
	}
	return r
}
func messageJSONxx(key string, value string) []byte {
	var message = map[string]string{
		"key": value,
	}
	r, err := json.Marshal(message)
	if err != nil {
		panic(err)
	}
	return r
}
func messageJSONx(str string) []byte {
	var message = map[string]string{
		"message": str,
	}
	r, err := json.Marshal(message)
	if err != nil {
		panic(err)
	}
	return r
}

func messageJSON2() []byte {
	var message = map[string]string{
		"message": "You suck lol...!",
	}
	r, err := json.Marshal(message)
	if err != nil {
		fmt.Println("You suck lol...!")
		panic(err)
	}
	return r
}

func messageJSON3() []byte {
	var message = map[string]string{
		"message": "You really suck lol...!",
	}
	r, err := json.Marshal(message)
	if err != nil {
		fmt.Println("You suck lol...!")
		panic(err)
	}
	return r
}

// Global Variables \\
var sessionLength int = 3
var dbSessionsCleaned time.Time

const RFC3339 = "2006-01-02T15:04:05Z07:00"

func checkSessions() {
	for range time.Tick(time.Second * time.Duration(sessionLength)) {
		cleanSessions()
	}
}

func init() {
	dbSessionsCleaned = time.Now()
}
func doNothing(w http.ResponseWriter, r *http.Request) {}

// MAIN FUNCTION ================================== MAIN FUNCTION \\
func main() {
	fmt.Println("Server going! @ localhost:8123...")

	//go checkSessions() // function loop never leaves?

	http.HandleFunc("/favicon.ico", doNothing)
	http.Handle("/", corsHandler(http.HandlerFunc(index)))
	http.Handle("/signup", corsHandler(http.HandlerFunc(signup)))
	http.Handle("/login", corsHandler(http.HandlerFunc(login)))
	http.Handle("/logout", corsHandler(http.HandlerFunc(logout)))

	http.Handle("/whitelist", corsHandler(http.HandlerFunc(whitelist)))
	http.Handle("/netherportals", corsHandler(http.HandlerFunc(netherPortals)))

	http.Handle("/testingpoint", corsHandler(http.HandlerFunc(testingPoint)))
	http.HandleFunc("/testingpoint2", testingPoint2)
	http.HandleFunc("/testingpoint3", testingPoint3)
	//http.HandleFunc("/nativekey", native_key)
	http.HandleFunc("/nativesignup", native_signup)
	http.HandleFunc("/nativelogin", native_login)
	http.HandleFunc("/nativelogin2", native_login2)
	http.HandleFunc("/sessiontimeleft", sessionTimeLeft)
	http.HandleFunc("/nativelogout", nativeLogout)
	//http.Handle("/nativelogin", corsHandler(http.HandlerFunc(native_login)))

	http.Handle("/somelist", corsHandler(http.HandlerFunc(betterWhitelist)))
	http.Handle("/sendmember", corsHandler(http.HandlerFunc(sendMemberByName)))
	http.HandleFunc("/netherportalcount", netherPortalCount)
	http.Handle("/netherportalcountcors", corsHandler(http.HandlerFunc(netherPortalCount)) )
	http.Handle("/vecnetherportals", corsHandler(http.HandlerFunc(vecNetherPortals)))
	http.Handle("/savenetherportals", corsHandler(http.HandlerFunc(saveNetherPortals)))
	//http.Handle("/getnetherportalimages", corsHandler(http.HandlerFunc(getNetherPortalImages)))
	// this commented out route should and maybe does exist on the AWS S3 Golang Server
	http.Handle("/getnetherportalimagenames", corsHandler(http.HandlerFunc(getNetherPortalImageNames)))



	http.ListenAndServe(":8123", nil)
	// end of main jump for vim
}

/*

ALTER TABLE netherportals RENAME local_nether to locale_nether

 INSERT INTO netherportals(id, xcord_overworld, ycord_overworld, zcord_overworld, xcord_nether, ycord_nether, zcord_nether, local_overworld, owner_overworld, notes_overworld, local_nether, owner_nether, notes_nether)
 values(1, 79, 79, 79, -66, -66, -66, 'Its Onion Knight Gone LOL', 'NetherCraft', 'This PLEASE LIVE is SpanK.', 'Its Nether Gone LOL', 'NetherCraft', 'This GO DIE is DanK');

 INSERT INTO netherportals(id, xcord_overworld, ycord_overworld, zcord_overworld, xcord_nether, ycord_nether, zcord_nether, local_overworld, owner_overworld, notes_overworld, local_nether, owner_nether, notes_nether)
 values(6, 9, 878, 79, -622, -93, -806, 'Its Onion Knight Gone LOL', 'NetherCraft', 'This PLEASE LIVE is SpanK.', 'Its Nether Gone LOL', 'NetherCraft', 'This GO DIE is DanK');

 INSERT INTO netherportals(id, xcord_overworld, ycord_overworld, zcord_overworld, xcord_nether, ycord_nether, zcord_nether, local_overworld, owner_overworld, notes_overworld, local_nether, owner_nether, notes_nether)
 values(0, 10999000000000, 10999000000000, 10999000000000, -88888, -88888, -50, 'Its Onion Knight Gone LOL', 'NetherCraft', 'This PLEASE LIVE is SpanK.', 'Its Nether Gone LOL', 'NetherCraft', 'This GO DIE is DanK');

 CREATE TABLE netherportals(
  id INT PRIMARY KEY NOT NULL UNIQUE,

  xcord_overworld INT NOT NULL,
  ycord_overworld INT NOT NULL,
  zcord_overworld INT NOT NULL,

  xcord_nether INT NOT NULL,
  ycord_nether INT NOT NULL,
  zcord_nether INT NOT NULL,

  local_overworld TEXT,
  owner_overworld TEXT,
  notes_overworld TEXT,

  local_nether TEXT,
  owner_nether TEXT,
  notes_nether TEXT);
*/

func sessionTimeLeft(w http.ResponseWriter, r *http.Request) {
	var key Key
	body, err := ioutil.ReadAll(r.Body)
	panik(err)

	err = json.Unmarshal(body, &key)
	panik(err)

	if key.Key == "" {
		fmt.Println("Key equals no characters, an empty string ||")
		sessionTime := map[string]string{
			"second": "",
			"minute": "",
			"hour":   "",
		}
		theTimeJson, err := json.Marshal(sessionTime)
		panik(err)

		w.WriteHeader(http.StatusForbidden)
		w.Write(theTimeJson)
	} else {
		theTimeString := selectFromDB("expiration", "native_user_keys", "sessionid", key.Key)
		theTime, err := time.Parse(RFC3339, theTimeString)
		panik(err)

		theTimeMap := getSessionTimeToMap(theTime)
		theTimeNowMap := getSessionTimeToMap(time.Now())
		for key := range theTimeNowMap {
			difference := panikReturnInt(strconv.Atoi(theTimeMap[key])) - panikReturnInt(strconv.Atoi(theTimeNowMap[key]))
			theTimeMap[key]	= strconv.Itoa(difference)
		}

		theTimeJson, err := json.Marshal(theTimeMap)
		panik(err)

		w.WriteHeader(http.StatusAccepted)
		w.Write(theTimeJson)
	}

}

func testingPoint(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write(messageJSON())
}

func testingPoint2(w http.ResponseWriter, r *http.Request) {
	fmt.Println("does something happen?")
	var resp map[string]string
	body, err := ioutil.ReadAll(r.Body)
	panik(err)

	err = json.Unmarshal(body, &resp)
	panik(err)

	fmt.Println(resp)
}

func unmarshalResponse(reader io.ReadCloser) map[string]string {
	var response map[string]string
	body, err := ioutil.ReadAll(reader)
	panik(err)

	err = json.Unmarshal(body, &response)
	panik(err)

	return response
}

//	type NativeKey struct {
//		id 		   string
//		sessionid  uuid.UUID
//		lastactive string
//		expiration string
//		username   string
//	}
//
//	type Crud struct {
//		table           string
//		column          []string
//		column_value    []string
//		where           string
//		where_condition string
//	}
func createTimeRFC3339(theTime time.Time) time.Time {
	someTime, err := time.Parse(RFC3339, theTime.Format(RFC3339))
	panik(err)

	return someTime
}
func createTimeStringRFC3339(theTime time.Time) string {
	someTime := theTime.Format(RFC3339)

	return someTime
}

func native_key(profile nProfile) (bool, string) {
	var crud Crud
	// check if the user has a profile already created
	//crud = Crud {
	//	table: "userprofile",
	//	where: "password",
	//	where_condition: r.URL.Query()["password"][0],
	//}

	username := profile.Username
	password := profile.Password
	if checkIfExists("userprofile", "username", username) {
		storedPassword := selectFromDB("password", "userprofile", "username", username)
		err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))
		if !panikBool(err) {
			return false, ""
			//w.WriteHeader(http.StatusForbidden)
		} else {
			nk := NativeKey{
				Id:         getValidIDstr("native_user_keys"),
				Sessionid:  uuid.NewV4().String(),
				Lastactive: time.Now().String(),
				Expiration: time.Now().Add(time.Hour).String(),
				Username:   username, //r.URL.Query()["username"][0],  //unmarshalResponse(r.Body)["username"],
			}
			crud = Crud{
				table:        "native_user_keys",
				column:       []string{"id", "sessionid", "lastactive", "expiration", "username"},
				column_value: []string{nk.Id, nk.Sessionid, nk.Lastactive, nk.Expiration, nk.Username},
			}
			dbCreate(crud)

			//w.Header().Set("Content-Type", "application/json")
			//w.WriteHeader(http.StatusOK)
			//w.Write(messageJSONxx("key", nk.Sessionid))
			return true, nk.Sessionid

			// and then...
		}
	}
	return false, ""
}

//func createNativeKey(profile nProfile) (bool, string) {
//crud := Crud{
//table:        "userprofile",
//column:       []string{"id", "username", "password", "firstname", "lastname", "role"},
//column_value: []string{getValidIDstr("userprofile"), profile.Username, hashIt(profile.Password), profile.Firstname, profile.Lastname, profile.Role},
//}
//dbCreate(crud)
//booly, key := native_key(profile)
////if booly {
////	w.Header().Set("Content-Type", "application/json")
////	w.WriteHeader(http.StatusOK)
////	w.Write(messageJSONxx("key", key))
////} else {
////	w.WriteHeader(http.StatusForbidden)
////	w.Write(messageJSONxx("key", key))
////}
//}
type Portal struct {
	Xcord  int
	Ycord  int
	Zcord  int
	Locale string
	Owner  string
	Notes  string
	True_Name string
}

type NetherPortal struct {
	Id        int
	Nether    Portal
	OverWorld Portal
	Username string
}

//func send_np_with_address_to_next_np(w http.ResponseWriter, r *http.Request) {
//
//	var netherPortal NetherPortal
//
//
//
//
//
//
//}

func netherPortals(w http.ResponseWriter, r *http.Request) { // RE-FACTOR


	type AllNetherPortals struct {
		AllNetherPortals []NetherPortal
	}
	var allNetherPortals AllNetherPortals

	sql_read := `table netherportals`
	db := create_DB_Connection()
	rows, err := db.Query(sql_read)
	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var netherPortal NetherPortal

		err = rows.Scan(&netherPortal.Id,
			&netherPortal.OverWorld.Xcord,
			&netherPortal.OverWorld.Ycord,
			&netherPortal.OverWorld.Zcord,

			&netherPortal.Nether.Xcord,
			&netherPortal.Nether.Ycord,
			&netherPortal.Nether.Zcord,

			&netherPortal.OverWorld.Locale,
			&netherPortal.OverWorld.Owner,
			&netherPortal.OverWorld.Notes,
			&netherPortal.OverWorld.True_Name,

			&netherPortal.Nether.Locale,
			&netherPortal.Nether.Owner,
			&netherPortal.Nether.Notes,
			&netherPortal.Nether.True_Name,

		)
		if err != nil {
			panic(err)
		}
		allNetherPortals.AllNetherPortals = append(allNetherPortals.AllNetherPortals, netherPortal)
	}
	db.Close()
	rows.Close()

	jsonAllNetherPortals, err2 := json.Marshal(allNetherPortals)
	if err2 != nil {
		panic(err2)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonAllNetherPortals)

}
func internalWhitelist() map[string]string{
	db := create_DB_Connection()

	crud := Crud {
		table: "userprofile",
		column: []string{"username"},
	}
	sql_string := dbRead(crud)

	var arrayOfNames = make(map[string]string)
	rows, err := db.Query(sql_string)
	panik(err)
	var inc int = 0
	for rows.Next() {
		var name string
		err = rows.Scan(&name)
		panik(err)

		arrayOfNames[strconv.Itoa(inc)] = name
		inc = inc + 1	
	}
	db.Close()

	return arrayOfNames
}


func betterWhitelist(w http.ResponseWriter, r *http.Request) {
	db := create_DB_Connection()

	crud := Crud {
		table: "netherportals",
		column: []string{"id, username"},
	}
	sql_string := dbRead(crud)

	
	type MemberId struct {
		Id string
		Name string
	}
	type MemberIds struct {
		Member_Ids []MemberId
	}
	//var arrayOfNames = make(map[string]map[string]string)
	//var arrayOfNames = make([]map[string]string, 0)
	var member_ids MemberIds
	rows, err := db.Query(sql_string)
	panik(err)
	var inc int = 0
	for rows.Next() {
		var memberid MemberId
		err = rows.Scan(&memberid.Id , &memberid.Name)
		panik(err)

		//arrayOfNames[strconv.Itoa(inc)] = 
		//arrayOfNames = append(arrayOfNames, map[string]string {
		//	"id": id,
		//	"name": name,
		//})
		member_ids.Member_Ids = append(member_ids.Member_Ids, memberid)
		inc = inc + 1	
	}
	w.Header().Set("Content-Type", "application/json")
	//w.Write(map_to_json(arrayOfNames))
	response, err := json.Marshal(member_ids)
	panik(err)
	w.Write(response)
	db.Close()
}

//	where_condition: r.URL.Query()["password"][0],
func sendMemberByName(w http.ResponseWriter, r *http.Request) {

	id := r.URL.Query()["id"][0]
	if checkIfExists("netherportals", "id", id) {

		db := create_DB_Connection()
		crud := Crud {
			table: "netherportals", 
			column: []string{"*",},
			where: "id",
			where_condition: id,

		}
		fmt.Println("MORE GAERBAGELKJSDL: |", crud)
		var portal NetherPortal
		sql_string := dbRead2(crud)
		fmt.Println("MY CUSTOM SQL STRING", sql_string)
		err := db.QueryRow(sql_string).Scan(
			&portal.Id,
			&portal.OverWorld.Xcord, 
			&portal.OverWorld.Ycord, 
			&portal.OverWorld.Zcord, 

			&portal.Nether.Xcord, 
			&portal.Nether.Ycord, 
			&portal.Nether.Zcord, 

			&portal.OverWorld.Locale,
			&portal.OverWorld.Owner,
			&portal.OverWorld.Notes,
			&portal.OverWorld.True_Name,

			&portal.Nether.Locale,
			&portal.Nether.Owner,
			&portal.Nether.Notes,
			&portal.Nether.True_Name,

			&portal.Username,
		)
		panik(err)

		somePortal, err := json.Marshal(portal)
		panik(err)

		w.Header().Set("Content-Type", "application/json")
		fmt.Println("some portal ==========", portal)
		w.Write(somePortal)
		db.Close()
	}

}

func whitelist(w http.ResponseWriter, r *http.Request) { // RE-FACTOR
	db := create_DB_Connection()

	//crud := Crud{
	//	table:  "whitelist",
	//	column: []string{"id"},
	//}
	//sql_read := dbRead(crud)
	//fmt.Println(sql_read)
	//var idKeys string
	//rows, err := db.Query(sql_read)
	//if err != nil {
	//	panic(err)
	//}
	//for rows.Next() {
	//	var id int
	//	err = rows.Scan(&id)
	//	if err != nil {
	//		panic(err)
	//	}
	//	idKeys = idKeys + " " + strconv.Itoa(id)
	//}
	//err = rows.Err()
	//if err != nil {
	//	panic(err)
	//}
	//rows.Close()
	////db.Close()

	//w.Write(messageJSONx(idKeys))

	type Member struct {
		Id      string
		Member  string
		Servers string
	}
	type Whitelist struct {
		Whitelist []Member
	}
	var whitelist Whitelist

	sql_read := `table whitelist;`
	rows, err := db.Query(sql_read)
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		var memberStruct Member
		var member, servers string
		var id int
		err = rows.Scan(&id, &member, &servers)
		if err != nil {
			panic(err)
		}
		memberStruct.Id = strconv.Itoa(id)
		memberStruct.Member = member
		memberStruct.Servers = servers
		whitelist.Whitelist = append(whitelist.Whitelist, memberStruct)
	}
	db.Close()
	rows.Close()

	jsonWhitelist, err2 := json.Marshal(whitelist)
	if err2 != nil {
		panic(err2)
	}
	w.Write(jsonWhitelist)

}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Print("\n\n\n")
	fmt.Println("Welcome to the ghostINDEX!")

	var profile nProfile
	initialLoadUser(w, r, &profile)

	if profile.Username != "" {
		fmt.Println("serving userprofile...")
		w.Write(profile.Encode())
	} else {
		fmt.Println("writing messageJSON()...")
		w.Write(messageJSON())
	}

	fmt.Print("\n\n\n")

}

func native_signup(w http.ResponseWriter, r *http.Request) {

	//if r.Method == http.MethodGet {
	//	if nativeAlreadyLoggedIn(w, r) {
	//		w.WriteHeader(http.StatusSeeOther)
	//		return
	//	}
	//}

	if r.Method == http.MethodPost {
		var profile nProfile
		profile.Decode((r.Body))

		if !checkUsernameAvailability(profile) {
			http.Error(w, "Username is already taken!", http.StatusForbidden)
			return
		}

		// create a database profile
		crud := Crud{
			table:        "userprofile",
			column:       []string{"id", "username", "password", "firstname", "lastname", "role"},
			column_value: []string{getValidIDstr("userprofile"), profile.Username, hashIt(profile.Password), profile.Firstname, profile.Lastname, profile.Role},
		}
		dbCreate(crud)
		booly, key := native_key(profile)
		if booly {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(messageJSONxx("key", key))
		} else {
			w.WriteHeader(http.StatusForbidden)
			w.Write(messageJSONxx("key", key))
		}
	}
}

func signup(w http.ResponseWriter, r *http.Request) {
	fmt.Println("You made it to ghostSignup...!")
	if r.Method == http.MethodGet {
		if alreadyLoggedIn(w, r) { // TODO make sure this works
			//http.Redirect(w, r, "/", http.StatusSeeOther)
			w.WriteHeader(http.StatusSeeOther)
			return
		}
	}

	if r.Method == http.MethodPost {

		// Convert request body to strings and store it in user Object
		var profile nProfile
		profile.Decode(r.Body)

		if !checkUsernameAvailability(profile) {
			http.Error(w, "Username is already taken!", http.StatusForbidden)
			return
		}

		// Check for a pre-existsing session ELSE create session
		cookie, err := r.Cookie("session")
		if err != nil {
			cookie = testSession2(sessionLength, w, r)
		}

		// Update session in the database with cookie.Value as sessionid
		crud := Crud{
			table:        "sessions",
			column:       []string{"id", "username", "sessionid", "lastactivity"},
			column_value: []string{getValidIDstr("sessions"), profile.Username, cookie.Value, time.Now().Format(time.RFC3339)},
		}
		// Create record in sessions table
		dbCreate(crud)
		// Create record in userprofile table
		crud = Crud{
			table:        "userprofile",
			column:       []string{"id", "username", "password", "firstname", "lastname", "role"},
			column_value: []string{getValidIDstr("userprofile"), profile.Username, hashIt(profile.Password), profile.Firstname, profile.Lastname, profile.Role},
		}
		dbCreate(crud)

		w.WriteHeader(http.StatusOK)
	}

}

type NativeProfile struct {
		Username string
		Password string
		SessionKey string
}
func native_login2(w http.ResponseWriter, r *http.Request) {

	// if the user is logged in and has a key... how do you know if they still possess it?
	// and if they still possess it, what do you do to not waste time sending another one?
	// should they not prove their claim!?
	

	var profile NativeProfile
	profile.Decode(r.Body)

	//var profile nProfile
	//profile.Decode(r.Body)

	// check if username is real
	fmt.Println("user name here:", profile.Username)
	if !checkIfExists("userprofile", "username", profile.Username) {
		//http.Error(w, "Username and/or password do not match! USERNAME FAIL!", http.StatusForbidden)
		fmt.Println("username fail")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// check if password is correct
	storedPassword := selectFromDB("password", "userprofile", "username", profile.Username)
	err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(profile.Password))
	if err != nil {
		fmt.Print("\n", err, "\n Login Failed \n")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// get their sessionid: 1) check if its expired, if so update the sessionid
	//nativeProfile.Key = createNativeKey(profile.Username)

	// check if session exists
	if checkIfExists("native_user_keys", "username", profile.Username) {
		// now find out if their session is still valid ([1])
		// a valid session is...? one that has not expired yet
		// so check to see if their expiration date (give to the session in the database under "expiration") has passed yet or not
		theTimeString := selectFromDB("expiration", "native_user_keys", "username", profile.Username)
		theTime, err := time.Parse(RFC3339, theTimeString)
		panik(err)

		//if yes then, is the session still valid...? ([2])
		now, err := time.Parse(RFC3339, time.Now().Format(RFC3339))
		panik(err)
		//if theTime.After(now) {
		fmt.Println("DIFFERENCE BETWEEN: ", theTime.Sub(now))
		if now.After(theTime) {
			fmt.Println("After is true")
			//if theTime.After(theTime.Add(time.Duration(time.Second * 30))) { // if not valid ([3.not valid])
			// create a new session key!
			var crud Crud = Crud{
				table:           "native_user_keys",
				where:           "username",
				where_condition: profile.Username,
			}
			dbDelete(crud)
			someKey := createNativeKey(profile.Username)
			w.WriteHeader(http.StatusAccepted)

			// after creating a new session...
			// send a message (along with the new key) through http to tell them how long they have left...!

			var message = map[string]interface{}{
				"key":  someKey,
				"time": getSessionTimeToMap(theTime),
			}
			r, err := json.Marshal(message)
			panik(err)
			w.Write(r)

			return
		} else { // if valid ([3.is valid])
			fmt.Println("After is False ")
			// return the session key...!
			dbSessionKey := selectFromDB("sessionid", "native_user_keys", "username", profile.Username)
			//var newMessage string
			//if dbSessionKey == profile.SessionKey {
			//	newMessage = "Your already logged in!"
			//} else {
			//	newMessage = "Your getting a key!"
			//}
			 
			var message = map[string]interface{}{
				"key":  dbSessionKey,
				"time": getSessionTimeToMap(theTime),
			}
			r, err := json.Marshal(message)
			panik(err)
			w.WriteHeader(http.StatusAccepted)
			w.Write(r)
			return
		}
	} else {
		someKey := createNativeKey(profile.Username)

		theTimeString := selectFromDB("expiration", "native_user_keys", "username", profile.Username)
		theTime, err := time.Parse(RFC3339, theTimeString)
		panik(err)

		var message = map[string]interface{}{
			"key":  someKey,
			"time": getSessionTimeToMap(theTime),
		}
		r, err := json.Marshal(message)
		panik(err)
		w.WriteHeader(http.StatusAccepted)
		w.Write(r)
		return

	}

	// if session is still valid...
	//w.Write(messageJSONxx("key", nativeProfile.Key))

	// create a time in hours, minutes, seconds that describes how much time is left on the current user's session
	// parse it to a string and call it timeLeftUntilSessionExpiration
	// use this variable to be sent in the message that will be passed to the user through http

	//func messageJSONxx(key string, value string) []byte {
	//var message = map[string]string{
	//	"key": value,
	//}
	//r, err := json.Marshal(message)
	//if err != nil {
	//	panic(err)
	//}
	//return r
	//}

	//updateNativeKeyExpiration(uuid.NewV4().String())
	//if checkNativeKeyExpiration(nativeProfile.Key) {
	//	// update
	//	updateNativeKeyExpiration(nativeProfile.Key)
	//	// do things
	//}
	// false check, do other things...?
}


func native_login(w http.ResponseWriter, r *http.Request) {

	// if the user is logged in and has a key... how do you know if they still possess it?
	// and if they still possess it, what do you do to not waste time sending another one?
	// should they not prove their claim!?

	var nativeProfile nativenProfile
	nativeProfile.Decode(r.Body)
	fmt.Println("SOME native profile?: ", nativeProfile)

	var profile nProfile = nativeProfile.Profile
	//var profile nProfile
	//profile.Decode(r.Body)

	// check if username is real
	fmt.Println("user name here:", profile.Username)
	if !checkIfExists("userprofile", "username", profile.Username) {
		//http.Error(w, "Username and/or password do not match! USERNAME FAIL!", http.StatusForbidden)
		fmt.Println("username fail")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// check if password is correct
	storedPassword := selectFromDB("password", "userprofile", "username", profile.Username)
	err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(profile.Password))
	if err != nil {
		fmt.Print("\n", err, "\n Login Failed \n")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// get their sessionid: 1) check if its expired, if so update the sessionid
	//nativeProfile.Key = createNativeKey(profile.Username)

	// check if session exists
	if checkIfExists("native_user_keys", "username", profile.Username) {
		// now find out if their session is still valid ([1])
		// a valid session is...? one that has not expired yet
		// so check to see if their expiration date (give to the session in the database under "expiration") has passed yet or not
		theTimeString := selectFromDB("expiration", "native_user_keys", "username", profile.Username)
		theTime, err := time.Parse(RFC3339, theTimeString)
		panik(err)

		//if yes then, is the session still valid...? ([2])
		now, err := time.Parse(RFC3339, time.Now().Format(RFC3339))
		panik(err)
		//if theTime.After(now) {
		fmt.Println("DIFFERENCE BETWEEN: ", theTime.Sub(now))
		if now.After(theTime) {
			fmt.Println("After is true")
			//if theTime.After(theTime.Add(time.Duration(time.Second * 30))) { // if not valid ([3.not valid])
			// create a new session key!
			var crud Crud = Crud{
				table:           "native_user_keys",
				where:           "username",
				where_condition: profile.Username,
			}
			dbDelete(crud)
			someKey := createNativeKey(profile.Username)
			w.WriteHeader(http.StatusAccepted)

			// after creating a new session...
			// send a message (along with the new key) through http to tell them how long they have left...!
			var message = map[string]interface{}{
				"key":  someKey,
				"time": getSessionTimeToMap(theTime),
			}
			r, err := json.Marshal(message)
			panik(err)
			w.Write(r)

			return
		} else { // if valid ([3.is valid])
			fmt.Println("After is False ")
			// return the session key...!
			dbSessionKey := selectFromDB("sessionid", "native_user_keys", "username", profile.Username)
			var message = map[string]interface{}{
				"key":  dbSessionKey,
				"time": getSessionTimeToMap(theTime),
			}
			r, err := json.Marshal(message)
			panik(err)
			w.Write(r)
			return
		}
	} else {
		someKey := createNativeKey(profile.Username)

		theTimeString := selectFromDB("expiration", "native_user_keys", "username", profile.Username)
		theTime, err := time.Parse(RFC3339, theTimeString)
		panik(err)

		var message = map[string]interface{}{
			"key":  someKey,
			"time": getSessionTimeToMap(theTime),
		}
		r, err := json.Marshal(message)
		panik(err)
		w.Write(r)
		return

	}

	// if session is still valid...
	//w.Write(messageJSONxx("key", nativeProfile.Key))

	// create a time in hours, minutes, seconds that describes how much time is left on the current user's session
	// parse it to a string and call it timeLeftUntilSessionExpiration
	// use this variable to be sent in the message that will be passed to the user through http

	//func messageJSONxx(key string, value string) []byte {
	//var message = map[string]string{
	//	"key": value,
	//}
	//r, err := json.Marshal(message)
	//if err != nil {
	//	panic(err)
	//}
	//return r
	//}

	//updateNativeKeyExpiration(uuid.NewV4().String())
	//if checkNativeKeyExpiration(nativeProfile.Key) {
	//	// update
	//	updateNativeKeyExpiration(nativeProfile.Key)
	//	// do things
	//}
	w.WriteHeader(http.StatusForbidden)
	// false check, do other things...?
}


func login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("You made it to ghostLogin...!")
	if r.Method == http.MethodGet {
		if alreadyLoggedIn(w, r) {
			fmt.Println("proc")
			w.WriteHeader(http.StatusOK)
			return
		}
	}

	//var profile nProfile
	if r.Method == http.MethodPost {

		//Convert request body to strings
		var profile nProfile
		profile.Decode(r.Body)

		// Check if Client's username exists
		if !checkIfExists("userprofile", "username", profile.Username) {
			http.Error(w, "Username and/or password do not match! USERNAME FAIL!", http.StatusForbidden)
			return
		}

		// Check if Client's password exists
		storedPassword := selectFromDB("password", "userprofile", "username", profile.Username)
		err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(profile.Password))
		if err != nil {
			http.Error(w, "Username and/or password do not match! PASSWORD FAIL!", http.StatusForbidden)
			fmt.Print("\n", err, "\n Login Failed \n")
			return
		}

		// Create session and update database
		cookie := testSession2(sessionLength, w, r)
		crud := Crud{
			table:           "sessions",
			column:          []string{"id", "username", "sessionid", "lastactivity"},
			column_value:    []string{getValidIDstr("sessions"), profile.Username, cookie.Value, time.Now().Format(time.RFC3339)},
			where:           "username",
			where_condition: profile.Username,
		}

		// If user already has a session THEN update ELSE create
		if checkIfExists("sessions", "username", profile.Username) {
			dbUpdate(crud)
			fmt.Println("Successfull Login")
		} else {
			fmt.Println("Successfull Login")
			dbCreate(crud)
		}

		w.WriteHeader(http.StatusOK)
		return
	}
}

func testingPoint3(w http.ResponseWriter, r *http.Request) {

	createNativeKey("luke.ochoa@gmail.com")

	theTimeString := selectFromDB("expiration", "native_user_keys", "username", "luke.ochoa@gmail.com")
	theTime, err := time.Parse(RFC3339, theTimeString)
	panik(err)

	var message = map[string]interface{}{
		"key":  "someKey", //selectFromDB("sessionid", "native_user_keys", "username", "luke.ochoa@gmail.com"),
		"time": getSessionTimeToMap(theTime),
	}
	theJSON, err := json.Marshal(message)
	panik(err)
	w.Header().Set("Content-Type", "application/json")
	w.Write(theJSON)

}

// TODO
// Make a "Logout" function/route piece-o-crap
type Logout struct {
	Username string
	Password string
	Session_Key string
}
func logout(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ping")
	cookie, err := r.Cookie("session")
	if err != nil { // if he does not have a session cookie
		w.Write(messageJSONx("You are not logged in."))
	} else { // if he has a session cookie
		if checkIfExists("sessions", "sessionid", cookie.Value) { // and he has a session in database
			deleteSession(w, r)
			w.Write(messageJSONx("You have just been logged out!"))
		}
	}

}

func nativeLogout(w http.ResponseWriter, r *http.Request) {

	var someBody Logout 
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&someBody)
	panik(err)

	if checkIfExists("native_user_keys", "sessionid", someBody.Session_Key) {
		deleteNativeSession(someBody.Session_Key)
		w.WriteHeader(http.StatusAccepted)
		fmt.Println("nativeLogout: Delete was maybe succcessfull...?")
	} else {
		fmt.Println("nativeLogout: user key did not exist: |", someBody.Session_Key ,"|")
	}


}

func netherPortalCount(writer http.ResponseWriter, request *http.Request) {
	db := create_DB_Connection()
	sql_string := "SELECT COUNT(id) FROM kingtest;"
	var count int
	err := db.QueryRow(sql_string).Scan(&count)
	panik(err)

	message := messageJSONxx("count", strconv.Itoa(count))
	writer.Header().Set("Content-Type", "application/json")
	writer.Write(message)
	db.Close()

}
func vecNetherPortals(writer http.ResponseWriter, request *http.Request) {
	db := create_DB_Connection()
	//	where_condition: r.URL.Query()["password"][0],
	orderby := request.URL.Query()["offset"][0]
	limit := request.URL.Query()["limit"][0]
	sql_string := fmt.Sprintf(`SELECT * FROM netherportals WHERE id > %s ORDER BY id LIMIT %s`, orderby, limit)
	rows, err := db.Query((sql_string))
	panik(err)

	key, err := strconv.Atoi(orderby)
	panik(err)
	portals := make(map[string]NetherPortal, 5)
	for rows.Next() {
		var portal NetherPortal
		err = rows.Scan(
			&portal.Id,
			&portal.OverWorld.Xcord, 
			&portal.OverWorld.Ycord, 
			&portal.OverWorld.Zcord, 

			&portal.Nether.Xcord, 
			&portal.Nether.Ycord, 
			&portal.Nether.Zcord, 

			&portal.OverWorld.Locale,
			&portal.OverWorld.Owner,
			&portal.OverWorld.Notes,
			&portal.OverWorld.True_Name,

			&portal.Nether.Locale,
			&portal.Nether.Owner,
			&portal.Nether.Notes,
			&portal.Nether.True_Name,

			&portal.Username,
		)
		panik(err)
		portals[strconv.Itoa(key)] = portal
		key = key + 1
	}
	somePortals, err := json.Marshal(portals)
	panik(err)
	writer.Header().Set("Content-Type", "application/json")
	writer.Write(somePortals)
	//somePortal, err := json.Marshal(portal)
	//panik(err)


}

func saveNetherPortals(writer http.ResponseWriter, request *http.Request) {
	var netherPortal NetherPortal

	body, err := ioutil.ReadAll(request.Body)
	panik(err)

	err = json.Unmarshal(body, &netherPortal)
	panik(err)

	var crud Crud = Crud {
		table: "netherportals",
		column: []string{"id" , "xcord_overworld" , "ycord_overworld", "zcord_overworld", "xcord_nether", "ycord_nether", "zcord_nether", "local_overworld", "owner_overworld", "notes_overworld", "overworld_true_name", "local_nether", "owner_nether", "notes_nether", "nether_true_name", "username"},
		column_value: []string{
			strconv.Itoa(netherPortal.Id),

			strconv.Itoa(netherPortal.OverWorld.Xcord),
			strconv.Itoa(netherPortal.OverWorld.Ycord),
			strconv.Itoa(netherPortal.OverWorld.Zcord),
			strconv.Itoa(netherPortal.Nether.Xcord),
			strconv.Itoa(netherPortal.Nether.Ycord),
			strconv.Itoa(netherPortal.Nether.Zcord),
			netherPortal.OverWorld.Locale,
			netherPortal.OverWorld.Owner,
			netherPortal.OverWorld.Notes,
			netherPortal.OverWorld.True_Name,

			netherPortal.Nether.Locale,
			netherPortal.Nether.Owner,
			netherPortal.Nether.Notes,
			netherPortal.Nether.True_Name,

			netherPortal.Username,
		},
		where: "id",
		where_condition: strconv.Itoa(netherPortal.Id),
	}
	var sql_update string
	column := make([]string, 0)
	for i:=0; i < 16; i++{
		column = append(column, fmt.Sprintf(`%s = '%s',`, crud.column[i], crud.column_value[i]))
	}
    lell := len(column[15]) -1 
	//fmt.Println("|", lell, len(column), "|")
	column[15] = column[15][0:lell]
	var bigstring string
	for x:=0; x<len(column); x++ {
		bigstring = bigstring + column[x] 
	}
	sql_update = fmt.Sprintf(`UPDATE %s SET %s WHERE %s = %s;`, crud.table, bigstring, crud.where, crud.where_condition)
	db := create_DB_Connection()
	fmt.Print("\n\n\n", sql_update)
	_, err = db.Exec(sql_update)
	panik(err)

	writer.WriteHeader(http.StatusAccepted)
}

func getNetherPortalImageNames(writer http.ResponseWriter, request *http.Request) {

	db := create_DB_Connection()
	sql_read := fmt.Sprintf("SELECT * FROM netherportal_images WHERE true_name='%s';", request.URL.Query()["true_name"][0])
	type ImageName struct {
		Id int 
		Name string
		True_name string
		Username string
	}
	imageNames := make(map[int]ImageName)
	rows, err := db.Query(sql_read)
	panik(err)
	for rows.Next() {
		var imageName ImageName
		err = rows.Scan(
			&imageName.Id,
			&imageName.Name,
			&imageName.True_name,
			&imageName.Username,
		)
		imageNames[imageName.Id] = imageName
		panik(err)
	}

	someImageNames, err := json.Marshal(&imageNames)
	panik(err)

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(someImageNames)
	db.Close()
}

// func getNetherPortalImages(writer http.ResponseWriter, request *http.Request) {

// }

func corsHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		switch r.Method {
		case "OPTIONS":
			fmt.Println("OPTIONS")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		case "GET":
			fmt.Println("GET")
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			h.ServeHTTP(w, r)
		default:
			fmt.Println("Default")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			h.ServeHTTP(w, r)
		}
		//if r.Method == "OPTIONS" {
		//	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		//	w.Header().Set("Access-Control-Allow-Credentials", "true")
		//	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		//}
		// else {
		//	w.Header().Set("Access-Control-Allow-Credentials", "true")
		//	h.ServeHTTP(w, r)
		//}
	}
}
