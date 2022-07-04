import React from "react";
import {useState, useEffect} from 'react';

/* Redux Toolkit Imports */
import { useSelector, useDispatch } from "react-redux";
import { allowPageUpdate, 
         loggy, 
         updateNetherPortalsForm, 
         hasThisBeenRenderedBeforeFunc, 
         stageOnChanges, 
         updateChosenNetherPortal } from './reduxLogic';

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
import SelectedMenu from './mainPage/SelectedMenu'
import ButtonBar from './mainPage/netherPortals/ButtonBar'


const UpdatePortalsTemplate = async (dispatch) => {
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

/* Main Function */
const MainPage = () => {

  const dispatch = useDispatch()

  useEffect( async () => {
    UpdatePortalsTemplate(dispatch)
  }, [])

  const [ selectedMenu, setSelectedMenu ] = useState('')
  const [ hoverMenu, setHoverMenu ] = useState('')

  return(
  <Container fluid className="Master">
      <div id='Master' className='row list-unstyled'>
        <SideBar setSelectedMenu={setSelectedMenu} setHoverMenu={setHoverMenu}/>
        <SelectedMenu selectedMenu={selectedMenu} hoverMenu={hoverMenu}/>
      </div>
  </Container>
  )
}

export default MainPage
