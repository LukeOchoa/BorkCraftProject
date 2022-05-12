import React from "react";
import Container from 'react-bootstrap/Container';

import TextField from '@mui/material/TextField'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import './Request2.css'



const Request2 = () => {

  return(
  <Container fluid className="Master">
      <div id='Master' className='row'>

        <SideBar />

        <div id='Content' className="col-lg-10">
          <ContentOverWorld />
          <ContentNether />
        </div>        

      </div>
  </Container>
  )
}

const SideBar = () => {
  return (
    <div id='SideBar' className="col sticky-top">
      Sidebar Items
      <li>Menu A</li>
      <li>Menu B</li>
      <li>Menu C</li>
      <li>Menu D</li>
      <li>Menu E</li>
      <li>Menu F</li>
      <li>Menu G</li>
    </div>
  )
}

const ContentOverWorld = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      Content Page
      <NetherPortals />
  </div>
  )
} 

const ContentNether = () => {
  return (
  <div id='ContentPage' className='row p-2'>
      Content Page
      <NetherPortals />
  </div>
  )
}


const NetherPortals = () => {
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
