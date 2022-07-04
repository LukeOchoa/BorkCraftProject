import ButtonBar from './netherPortals/ButtonBar'
import PortalTemplate from './netherPortals/PortalTemplate'

import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'



const NetherPortals = () => {
  const [ update, setUpdate ] = useState(false)
  

  function handleClose() {
    console.log('execute')
  }
  return(
    <div id='Content' className="col text-center">
      <ContentOverWorld setUpdate={setUpdate}/>
      <ContentNether />
    </div>        
  )
}

const ContentOverWorld = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <ButtonBar />
      <PortalTemplate props={'OverWorld'}/>
  </div>
  )
} 

const ContentNether = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      <header>Nether Co-ordinates</header>
      <PortalTemplate props={'Nether'}/>
  </div>
  )
}

export default NetherPortals
