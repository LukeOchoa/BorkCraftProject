import React from "react";
import {useState} from 'react';
import Container from 'react-bootstrap/Container';

import TextField from '@mui/material/TextField'

import './Request2.css'


/* Main Function */
const Request2 = () => {

  const [ selectedMenu, setSelectedMenu ] = useState('')
  const [ hoverMenu, setHoverMenu ] = useState('')

  return(
  <Container fluid className="Master">
      <div id='Master' className='row list-unstyled'>

        <NewSideBar setSelectedMenu={setSelectedMenu} setHoverMenu={setHoverMenu}/>
        <SelectedMenu selectedMenu={selectedMenu} hoverMenu={hoverMenu}/>

      </div>
  </Container>
  )
}

const NetherPortals = () => {
  return(
    <div id='Content' className="col text-center">
      <ContentOverWorld />
      <ContentNether />
    </div>        
  )
}

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
        { key: 8, name: "integration"},
        { key: 9, name: "accounts"},
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
        <div id='SideBar' className="col-2 sticky-top px-sm-2 bg-dark rounded-3 text-white">
          <div className="px-3 pt-2">
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


















/*
const SideBar = () => {
  return (
    <div id='SideBar' className="col sticky-top">
      Sidebar Items
      <li id='lis'>Menu A</li>
      <li id='lis'>Menu B</li>
      <li id='lis'>Menu C</li>
      <li id='lis'>Menu D</li>
      <li id='lis'>Menu E</li>
      <li id='lis'>Menu F</li>
      <li id='lis'>Menu G</li>
    </div>
  )
}
*/



const ContentOverWorld = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <header>Over World Co-ordinates</header>
      <PortalsTemplate/>
  </div>
  )
} 

const ContentNether = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <header>Nether Co-ordinates</header>
      <PortalsTemplate/>
  </div>
  )
}


const PortalsTemplate = () => {
  return (
    <div id='NetherPortals' className=''>
      <div id="Row1" className="row">

        <TextField className="col"
          value='x:999 y:999 z:999 1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' 
        ></TextField>
        
        <TextField className="col"
          value='x:999 y:999 z:999 2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' 
        ></TextField>

        <TextField className="col"
          value='x:999 y:999 z:999 3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' 
        ></TextField>

      </div>

      <div id="Row2" className="row">

        <div id='ImageScroll' className='col-md-4'>  

          <div>
            <img className="img-fluid" id='die' src="https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg"/>
          </div>

          <div> 
            <img className="img-fluid" id='die' src="https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg" />
          </div>
  
          <div>
            <img className="img-fluid" id='die' src="https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg" />
          </div>

        </div>

        <div id='Notes' className="col">
          More Text
        </div>
      </div>

    </div>
  )
}

export default Request2

























const MemberList = () => {
  return (
        <header>¯\_(ツ)_/¯ Member List route is currently empty ¯\_(ツ)_/¯ </header>
  )
}


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

const MemberTab = () => {    
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
                    onMouseOver={() => handleHover(item.Member)}
                    onMouseOut={() => handleHoverOut()}
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
