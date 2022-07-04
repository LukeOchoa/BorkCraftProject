import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container'

/* Material UI Imports ... */
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './Request.css'



const Request = () => {

    const [ selectedMenu, setSelectedMenu ] = useState('')

    return (
        <Container fluid className="Master">
            <div className="col row flex-nowrap align-items-start">

                    <div className="col-2 sticky-top px-sm-2 px-0 bg-dark rounded-3"> 
                        <div className="px-3 pt-2 text-white" >
                                <Sidebar setSelectedMenu={setSelectedMenu}/>
                        </div>
                </div>

                    <SelectedMenu selectedMenu={selectedMenu} />

                </div>
        </Container>
    )
}

const SelectedMenu = ({selectedMenu}) => {
    switch (selectedMenu) {
        case "members list":
            return (<MemberTab />)
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

const NetherPortals = () => {
    return (
    <div>
      <div className='row flex-nowrap'>

        <div className='row'>
        <div id='abox'
             className='col co-ordinates abox-content'>
        <TextField 
          fullWidth
          variant='filled' 
          value='x:999 y:999 z:999 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' 
          focused>
        </TextField> {/*onClick for memberr that authorizes change: Allow Change*/}
        </div>

        <div id='abox' 
             className='col locale abox-content'>
          <TextField
            fullWidth
            variant='filled'
            value='Near Spawn Point xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            focused>
          </TextField>
        </div>

        <div id='abox' 
             className='col-3 owner abox-content'>
          <TextField
            fullWidth
            variant='filled'  
            value='Lunailah xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            focused>
          </TextField>
        </div>
      </div>
      </div>

      <div className='row flex-nowrap morexla'>

      <MyPictures /> 

        <div className='col fakecard' >
          random div crap
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            Do i need to import more mui?
        </div>

      </div>

    </div>



     // <header>¯\_(ツ)_/¯ Nether Portals route is currently empty ¯\_(ツ)_/¯ </header>
    )
}

const MyModal = (props) => {
  const [ open, setOpen ]= useState(false)
  const handleClose = () => setOpen() /* i hacked this pretty badly? fix in the future when you know what you are doing lol #frontendSucksAndSoDoesSnakeCase #Underscores_For_Life */
  const handleClick = () => {
    console.log('You lickylick-ied twice... teehee!!!')
    props.setModalAndImage({modal: false})
  }
  if (props.modalAndImage.modal) {
    return (
      <div>
        <Modal
          open={props.modalAndImage.modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Typography id="modal-modal-description" align='center' sx={{ mt: 2 }} >
              <img src={`${props.modalAndImage.img}`}
              onClick={handleClick}
              />
            </Typography>
        </Modal>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const MyPictures = () => {
  const [ modalAndImage, setModalAndImage ] = useState({modal: false, img: 'x'})
  const pictures = [
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Hummingbird.jpg',
        title: 'ThE BirB'
      },
      {
        img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
        title: 'ThE DoggO'
      },
  
    ]
  const handleClick = (picture) => {
    setModalAndImage({modal: true, img: picture})
  }
  return (
      <div className='col-auto birb'>
        <ImageList sx={{ maxWidth: 500, maxHeight: 500 }} cols={0} >
          {pictures.map((picture) => (
            <ImageListItem key={picture.img}>
              <img src={`${picture.img}`}
                   srcSet={`${picture.img}`}
                   alt={picture.title}
                   loading='lazy'
                   onClick={() => handleClick(picture.img)}
              />
            </ImageListItem>

          ))}
        </ImageList>
        <MyModal modalAndImage={modalAndImage} setModalAndImage={setModalAndImage}/>
      </div>
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


const Sidebar = ({setSelectedMenu}) => {
    const [ list, setList] = useState('')
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
            setSelectedMenu('')
            setList('unclicked')
            setStyle("")
        } else {
            setSelectedMenu(name)
            setStyle("salll")
            setList(name)
        }
    }
    const setCss = (name) => {
       if (name === list) {
           return style
       }
    }
    return (
        <ul classname="list-unstyled">
        </ul>
    )

}

export default Request

