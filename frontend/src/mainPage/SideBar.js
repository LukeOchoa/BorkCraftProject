import { useState, useEffect } from 'react';

const SideBar = (props) => {
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

export default SideBar
