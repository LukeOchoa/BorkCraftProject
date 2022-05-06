package main

import (
	//"github.com/satori/go.uuid"
	//"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type Any interface{}

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
	var message = map[string]string{
		"message": "There is Nothing to show!!!",
	}
	r, err := json.Marshal(message)
	if err != nil {
		fmt.Println("Panic inside messageJSON/index/main @ json.Marshal() 2222 ... !")
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
	fmt.Println("Server going! @ localhost:8080...")

	//go checkSessions() // function loop never leaves?

	http.HandleFunc("/favicon.ico", doNothing)
	http.Handle("/", corsHandler(http.HandlerFunc(index)))
	http.Handle("/signup", corsHandler(http.HandlerFunc(signup)))
	http.Handle("/login", corsHandler(http.HandlerFunc(login)))
	http.Handle("/logout", corsHandler(http.HandlerFunc(logout)))

	http.Handle("/whitelist", corsHandler(http.HandlerFunc(whitelist)))

	http.ListenAndServe(":8080", nil)
}

func whitelist(w http.ResponseWriter, r *http.Request) {
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

// TODO
// Make a "Logout" function/route piece-o-crap
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

func corsHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		switch r.Method {
		case "OPTIONS":
			fmt.Println("OPTIONS")
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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
