import React from "react";
import {useState, useEffect} from 'react';

/* Redux Toolkit Imports */
import { useSelector, useDispatch } from "react-redux";
import { allowPageUpdate, 
         loggy, 
         updateNetherPortalsForm, 
         hasThisBeenRenderedBeforeFunc, 
         stageOnChanges, 
         updateChosenNetherPortal,
         stateOnChanges2 } from './reduxLogic';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


/* MUI Imports */
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';

import './Request2.css'
import SideBar from './mainPage/SideBar'
import MemberList from './mainPage/MemberList'


/* Main Function */
const Request2 = () => {

  const [ selectedMenu, setSelectedMenu ] = useState('')
  const [ hoverMenu, setHoverMenu ] = useState('')

 /* 
  const stringo = useSelector((state) => 
    state.netherPortalsForms.formDataOverWorld
  )
  const dispatch = useDispatch()
  console.log(stringo, 'stringo goes here')
 */


  return(
  <Container fluid className="Master">
      <div id='Master' className='row list-unstyled'>

        <SideBar setSelectedMenu={setSelectedMenu} setHoverMenu={setHoverMenu}/>
        <SelectedMenu selectedMenu={selectedMenu} hoverMenu={hoverMenu}/>

      </div>
  </Container>
  )
}

/*
const NewSideBar = (props) => {
  const [ list, setList ] = useState('')
  const [ style, setStyle ] = useState('')
  const menus = [
        { key: 1, name: "members list"},
        { key: 2, name: "nether portals"},
        { key: 3, name: "end portals"},
        { key: 4, name: "end cities portals"},
        { key: 5, name: "shops"},
        { key: 6, name: "cool stuff"},
        { key: 7, name: "message board"},
        { key: 8, name: "integration"}, { key: 9, name: "accounts"},
  ]

  const handleClick = (name) => {
    if (name === list) {
        props.setSelectedMenu('')
        setList('unclicked')
        setStyle('')
    } else {
        props.setSelectedMenu(name)
        setList(name)
        setStyle('SideBarHover')
    }
  }

  const handleHoverOver = (name) => {
      props.setHoverMenu(name)

    }
  const handleHoverOut = () => {
    props.setHoverMenu('')
  }

  const setCSS = (name) => {
    if (name === list) {
      return style
    }
  }
  return (
        <div id='SideBar' className="col-2 sticky-top px-sm-2 bg-dark rounded-3 text-white"> <div className="px-3 pt-2">
        {
            menus.map(menu => {
                return <li id="lis" 
                        className={`${menu.name} ${setCSS(menu.name)}`} key={menu.key.toString()}
                        onClick={() => handleClick(menu.name)}
                        onMouseOver={() => handleHoverOver(menu.name)}
                        onMouseOut={() => handleHoverOut(menu.name)}
                >{menu.name}</li>
            })
        }
          </div>
        </div>
  )
} 
*/

const NetherPortals = () => {

  function handleClose() {
    console.log('execute')
  }
  return(
    <div id='Content' className="col text-center">
    <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target)
          handleClose()
        }}
    >  
      <ContentOverWorld />
      <ContentNether />
    </form>
    </div>        
  )
}

const ContentOverWorld = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <ButtonBar />
      <PortalsTemplate templateType={'OverWorld'}/>
  </div>
  )
} 

const ContentNether = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <header>Nether Co-ordinates</header>
      <PortalsTemplate templateType={'Nether'}/>
  </div>
  )
}

const ButtonBar = () => {

  const [ showDropdown, setShowDropdown ] = useState(false)
  const array1 = useSelector((state) => {
    let x = state.NetherPortals.allNetherPortals
    let tempArr = [];
    /*for (const key of x) { */
    for (var index = 0; index<x.length; index++) {
      const key = x[index]
      for (var key2 in key) {
        if (key2 != 'Id') {
          var tempArr2 = [index, "[Pair ", key.Id, "]", key2, " x: ", key[key2].Xcord, " y: ", key[key2].Ycord, " z: ", key[key2].Zcord]
          tempArr.push(tempArr2)
        }
      }
    }
    return tempArr
  })
  const dispatch = useDispatch()
  return (
    <div> 

      <header className="hx">Over World Co-ordinates</header>
      <div className='row p-2'>
        <Button className='col btn btn-dark btn-sm' onClick={() => dispatch(allowPageUpdate())}>augment</Button>
        <Button className='col btn btn-dark btn-sm' type='submit'>submit</Button>

        <div className='col'
             onMouseEnter={() => setShowDropdown(true)}
             onMouseLeave={() => setShowDropdown(false)}
             onClick={() => setShowDropdown(!showDropdown)}
        >
          {/* THIS DOESNOT WORK RIGHT */}
        <Dropdown id='Dropdown' className='row' drop={''}>
          
          <Dropdown.Toggle variant='success' id='' size='sm' >
            Dropdown Button
          </Dropdown.Toggle>
          
          <div>
          <Dropdown.Menu  show={showDropdown} className='my-dropdown'>
            {
              array1.map((item) => (
              <Dropdown.Item onClick={() => dispatch(updateChosenNetherPortal( [item[0], item[2]] ))}>{item}</Dropdown.Item>
              ))
            }
          </Dropdown.Menu>
          </div>

        </Dropdown>
        </div>
      
      </div>

    </div>
  )
}

// Current Death
const updatePortalsTemplate = async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:8080/NetherPortals", {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },})
      const liveNetherPortals = await response.json()
      dispatch(updateNetherPortalsForm(liveNetherPortals.AllNetherPortals))
    } catch (e) {
      console.log(e)
    }
}

const PortalsTemplate = (props) => {
  /*
  const formDataOverWorld = useSelector((state) => state.netherPortalsForms.allNetherPortals) 
  const formDataNether = useSelector((state) => state.netherPortalsForms.allNetherPortals)
  */
  /*const allNetherPortals2 = useSelector((state) =>  state.netherPortalsForms.allNetherPortals) */


  const dispatch = useDispatch()

  const xma = useSelector((state) => state.NetherPortals.selectedNetherPortal[1])
  console.log('XMA GOES HERE ()()()', xma)
  const table = useSelector((state) => state.NetherPortals.allNetherPortals)

  const [ clickEvent, setClickEvent ] = useState(false)
  const [ img, setImg ] = useState('')
  const [ inputProps, setInputProps ] = useState(true)

  const hasThisBeenRenderedBefore = useSelector((state) => state.NetherPortals.hasThisBeenRenderedBefore)
  useEffect(async () => {
    if (hasThisBeenRenderedBefore === false) {
      updatePortalsTemplate(dispatch)
    }
  }, [])
  if (!hasThisBeenRenderedBefore) {
    dispatch(hasThisBeenRenderedBeforeFunc())
  }

  const images = [
    {
      img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
      title: 'The DoggO'
    },
    {
      img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
      title: 'The DoggO'
    },
    /*{
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Hummingbird.jpg',
      title: 'ThE BirB'
    },*/
  ]
  const seelNether = useSelector((state) => state.NetherPortals.selectedNetherPortal[1])
  const handleChange = (change, x, y) => {
    /*
     var rval 
      for (const item of state.testObj) {
        console.log('immer item?', item, state.testObj, state.allNetherPortals)
        if (state.testObj[item]['Id'] == state.selectedNetherPortal)
          rval = item
      }
      state.testObj[rval][key][key2] = newChange.payload
    */
    var copyboi = structuredClone(breakMe)
    var rval
    var t
    console.log('breakMe', breakMe)
    for (var xtem = 0; xtem < breakMe.length; xtem++) {
      if (breakMe[xtem]['Id'] === seelNether) {
        copyboi[xtem].Nether.Xcord = change
        rval = xtem
      }
    }

    dispatch(stageOnChanges(change))
    dispatch(stateOnChanges2(copyboi))
    console.log("did this change?" , breakMe, copyboi)
    /*console.log('whole point', breakMe[rval[x]][y], )*/
  }
  function handleImageClick(booly, img) {
    setClickEvent(booly)
    setImg(img)
  }
  const placeholder = 1
  const augmentPage = useSelector((state) => state.NetherPortals.augment)
  const breakMe = useSelector((state) => state.NetherPortals.testObj)
  let breakChild = getTable(breakMe)
  var port = getTable(table)
  if (port == undefined) {
    port = {id: 'skin'}

  }

  const objectOverWorld = [
    {id: 'xcord',  defaultValue: 'x-cord', objectKey: 'Xcord' },
    {id: 'ycord',  defaultValue: 'y-cord', objectKey: 'Ycord' },
    {id: 'zcord',  defaultValue: 'z-cord', objectKey: 'Zcord' },
    {id: 'locale', defaultValue: 'locale', objectKey: 'Locale', },
    {id: 'owner',  defaultValue: 'owner',  objectKey: 'Owner' , },
  ]
  const objectNether = [ 
      {id: 'xcord',  defaultValue: 'x-cord', objectKey: 'Xcord' , },
      {id: 'ycord',  defaultValue: 'y-cord', objectKey: 'Ycord' , },
      {id: 'zcord',  defaultValue: 'z-cord', objectKey: 'Zcord' , },
      {id: 'locale', defaultValue: 'locale', objectKey: 'Locale', },
      {id: 'owner',  defaultValue: 'owner',  objectKey: 'Owner' , },
   ]
  let textFields
  let breakKey = props.templateType

  console.log('props', props)
  if (props.templateType === 'OverWorld') {
    textFields = objectOverWorld
  }
  if (props.templateType === 'Nether') {
    textFields = objectNether
  }

  function getTable(tables) {
    for (const index of tables)  {
        console.log("THE new XMA", xma)
        if (xma == index.Id) {
        return index
      }
    }
  }
  /*
  textFields.map((item) => {
    console.log("here is mappy", item)
  })*/
  /*
  for (const key of textFields) {
      <TextField
        id={`${key.id}`}
        className='col p-2'
        defaultValue={`${key.defaultValue}`}
        InputProps={{
          readOnly: augmentPage
        }}
        onChange={(e) => handleChange(e.target.value)}
      >
      </TextField>
  } */
  const handleDefaultValue = (loadedDefault, newDefault) => {
     
  }
  const newc = useSelector((state) => state.NetherPortals.testObj)
  console.log('testObj', useSelector((state) => state.NetherPortals.testObj), useSelector((state) => state.NetherPortals.allNetherPortals))
  if (breakChild == undefined)  {
    console.log("WHY DID YOU TRIGGER")
    return(
    <div></div>
    )
  } else {


  /*${key.p.id} */
  return (
    <div id='NetherPortals' className=''>
      <div id="Row1" className="row">
        {
          textFields.map((key) => (
          <TextField
            id={`${key.id}`}
            className='col p-2'
            defaultValue={`${key.defaultValue}: ${breakChild[breakKey][key.objectKey]}`}
            variant='standard'
            InputProps={{
              readOnly: augmentPage
            }}
            onChange={(e) => handleChange(e.target.value, breakKey, key.objectKey)}
          ></TextField>
          ))
        }



        {/*
        <TextField id='xcord' className="col p-2"
          variant='standard'
          defaultValue={`x-cord: ${placeholder}`}
          InputProps={{
            readOnly: augmentPage,
          }}
          onChange={(e) => handleChange(e.target.value)}
        ></TextField>
        <TextField id='ycord' className='col p-2'
          variant='standard'
          defaultValue={`y-cord: ${placeholder}`}
          InputProps={{
            readOnly: augmentPage, 
          }}
        ></TextField>
        <TextField id='zcord' className='col p-2'
          variant='standard'
          defaultValue={`z-cord: ${placeholder}`}
          InputProps={{
            readOnly: useSelector((state) => state.NetherPortals.augment),
          }}
        ></TextField>
        
        <TextField className="col p-2 textfield"
          variant='standard'
          defaultValue='locale'
          InputProps={{
            readOnly: useSelector((state) => state.NetherPortals.augment),
          }}
        ></TextField>

        <TextField className="col p-2"
          variant='standard'
          defaultValue='owner'
          InputProps={{
            readOnly: useSelector((state) => state.NetherPortals.augment),
          }}
        ></TextField>
          */}

      </div>

      <div id="Row2" className="row">

        <div id='ImageScroll' className='col-md-4'>  
          {
            images.map((image) => (
            <div>
              <img src={`${image.img}`}
                   key={`${image.title}`}
                   className='img-fluid'
                   onClick={() => handleImageClick(true, image.img)}
                />
            </div>
            ))
          }
          <MyModal clickEvent={clickEvent} setClickEvent={setClickEvent} img={img} />
        </div>

        <div id='Notes' className="col">
          More Text
        </div>
      </div>

    </div>
  )
  }
}

const MyModal = (props) => {
    const [ open, setOpen ] = useState(false)
    const handleClose = () => setOpen()
    const handleClick = () => {
      console.log('You clicked inside modal')
      props.setClickEvent(false)
    }
    return (
      <Modal
        open={props.clickEvent}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography id='modal-modal-description'
                    align='center'
                    justify='center'
                    sx={{ mt: 2 }}
        >
          <img src={`${props.img}`}
              onClick={handleClick}
          />
        </Typography>
      </Modal>
    )
}
export default Request2

/*
const MemberList = () => {
  return (
        <header>¯\_(ツ)_/¯ Member List route is currently empty ¯\_(ツ)_/¯ </header>
  )
}
*/

const EndPortals = () => {
    return (
        <header>¯\_(ツ)_/¯ End Portals route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const EndCitiesPortals = () => {
    return (
        <header>¯\_(ツ)_/¯ End Cities Portals route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const Shops= () => {
    return (
        <header>¯\_(ツ)_/¯ Shops route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const CoolStuff = () => {
    return (
        <header>¯\_(ツ)_/¯ Cool Stuff route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const MessageBoard = () => {
    return (
        <header>¯\_(ツ)_/¯ Message Board route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const Integration = () => {
    return (
        <header>¯\_(ツ)_/¯ Integration route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const Accounts = () => {
    return (
        <header>¯\_(ツ)_/¯ Accounts route is currently empty ¯\_(ツ)_/¯ </header> 
    )
}

const SelectedMenu = (props) => {
    let theMenu =''
    if (props.hoverMenu == '') {
      theMenu = props.selectedMenu
    } else {
      theMenu = props.hoverMenu
    }
    switch (theMenu) {
        case "members list":
            return (<MemberList />)
        case 'nether portals':
            return (<NetherPortals />) 
        case 'end portals':
            return (<EndPortals />)
        case 'end cities portals': 
            return (<EndCitiesPortals />)
        case 'shops':
            return (<Shops />)
        case 'cool stuff':
            return (<CoolStuff />)
        case 'message board': 
            return (<MessageBoard />)
        case 'integration':
            return (<Integration />)
        case 'accounts':
            return (<Accounts />)
        default:
            console.log("you found a bug?")
            return (<div>YOU FOUND A BUGG?</div>)
    }
}

/*
const MemberList = () => {    
    const [ whitelist, setWhitelist ] = useState({})
    const [ isWhiteListSet, setIsWhiteListSet ] = useState(false)
    const [ onHoverMember, setOnHoverMember ] = useState('')
    const [ onClickMembers, setOnClickMembers ] = useState([])
 
    useEffect(() => {
        Whitelist()
    }, [])
    const Whitelist = () => {
        fetch(
            'http://localhost:8080/whitelist',
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then((response) => {
            response.json().then(
                (data) => {
                    setWhitelist(data.Whitelist)
                    setIsWhiteListSet(true)
                }
            )
            })
    }   

    const handleHover = (name) => {
            setOnHoverMember(name)
    }
    const handleHoverOut = () => {
            setOnHoverMember('')
    }
    const handleClick = (name) => {
        if (onClickMembers.includes(name)) {
            setOnClickMembers((onClickMembers) => {
                for (var i=0;i<onClickMembers.length;i++) {
                    if (onClickMembers[i] === name) {
                        onClickMembers.splice(i, 1)
                        console.log(onClickMembers)
                        break
                    }
                }
                return [...onClickMembers]
            })
        } else {
            setOnClickMembers(onClickMembers => [...onClickMembers, name])
        }
    } 

    const setCss = (name) => {
        if (name === onHoverMember && !onClickMembers.includes(name)) {
            return 'not-hidden' // reveals the information
        } else if (onClickMembers.includes(name)){
            return 'not-hidden'

        } else {
            return 'hidden' // hides the information
        }
    }

    if (isWhiteListSet) {
        return (
            <div className='col offset-right'>
                <div className='row'>
                <header className='col section-headerx px-sm-2 px-0 bg-dark text-white text-center'>|Member|</header>
                <header className='col section-headerx px-sm-2 px-0 bg-dark text-white text-center'>|Server|</header>
                </div>                                
            {
                whitelist.map(item => {
                    return <div className='junkie'>

                    <header className='section-header mt-5 text-center' key={item.Id}
                    onMouseOver={() => handleHover(item.Member)}
                    onMouseOut={() => handleHoverOut()}
                    onClick={() => handleClick(item.Member)}
                    >

                    <p key={item.Id}>{item.Member}&emsp;{item.Servers}<br></br></p>
                    </header>
                    <div className={`${setCss(item.Member)}`}
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> 

                    </div>
                })
            }
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

*/