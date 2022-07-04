import NetherPortals from './NetherPortals'
import {useState} from 'react'

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

export default SelectedMenu
