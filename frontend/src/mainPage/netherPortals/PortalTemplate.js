
import {useState , useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";

import './portalTemplate.scss'
import '../../IndexDB'


import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography';

import { updateNetherPortalsForm,
         hasThisBeenRenderedBeforeFunc, 
         stageOnChanges, 
         stateOnChanges2,
         stageOnChanges3x,
         stageNetherPortalImageChanges,
         stageNetherPortalImageFilesChanges,
         reRender } from '../../reduxLogic';
import NetherPortals from '../NetherPortals';
import shoveImageIntoIndexedDB from '../../IndexDB';


//const indexedDB = 
//  window.indexedDB ||
//  window.mozIndexedDB ||
//  window.webkitIndexedDB ||
//  window.msIndexedDB ||
//  window.shimIndexedDB;
//
//  const request = indexedDB.open("PictureDB", 1)
//
//request.oneerror = function (event) {
//    console.error("An error occurred with IndexedDB")
//    console.error(event)
//}
//
//request.onupgradeneeded = function() {
//  console.log("YOAIUFOIUPSODIFUPOISDFUU&&&&&&&&&&&&&&&&&&&&&&&&&")
//  const db = request.result
//  const store = db.createObjectStore("pictures", { keyPath: 'id'})
//  store.createIndex("pictureDetails", ["imageFile", "imageName"], {unique: false})
//}


/*
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
} */

/*
const ReturnDivsOrTextField = (array, augment) => {
    if (augment) {
      return (
          array.map((key) => (
          <TextField
            id={`${key.id}`}
            key={key.stupidKey}
            className='col p-2'
            defaultValue={`${key.defaultValue}: ${defaultValue[key.objectKey]}`}
            variant='standard'
            InputProps={{
              readOnly: augment
            }}
            onChange={(e) => handleChange(e.target.value)}
          ></TextField>
          ))
      ) 
    } else {
      return (
        array.map((key) => (
          <div
            id={`${key.id}`}
            key={key.stupidKey}
            className='col p-2'
          >{key.defaultValue}: {defaultValue[key.objectKey]}
          </div>
        ))
      )
    }
} */

const textareaOrDiv = (augmentPage, handleChangeText) => {
  function handleChangeText(e) {
    e.preventDefault()

  }
  if (!augmentPage) {
    return (
      <textarea defaultValue='More Text' id='Notes' className="col" onChange={(e) => handleChangeText(e) } />
    )
  } else {
    return(
      <div id='Notes' className='col'>More Text</div>
    )
  }
}

const imageButton = (augmentPage, handleImageChange, dispatch, oldImages, oldImageFiles) => {
  if (!augmentPage) {
    return (
      <input type='file' onChange={(e) => handleImageChange(e, dispatch, oldImages, oldImageFiles)}/>
    )
  } else {
    return '|' 
  }
}

const loadImagesForTemplate = async (jobs) => {
  const getConfig = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }
  var results = [] 
  const goFetch = async (key) => {
    try {
      fetch(jobs[key], getConfig)
      .then(response => response.blob())
      .then(blob => {
        results.push({
          img: URL.createObjectURL(blob),
          title: key
        })
      })
    } catch (e) {
      goFetch(key)
    }
  }
  const doJobs = async () => {
    for (const key in jobs) {
      goFetch(key)
    }
  }
  await doJobs()
  return results
}

const loadImages = async () => {
  const baseURL = 'http://localhost:1234/specificpicture'
  const picturenameURL = 'http://localhost:1234/picturename'
  const getConfig = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await fetch(
      picturenameURL,
      getConfig,
    )
    const resolved = await response.json()
    var results = loadImagesForTemplate(resolved)
    return results
  } catch (e) {
    console.log(e)
  }
}

const PortalTemplate = (props) => {
  console.log('\n\n Section')

  
  /*const [ update, setUpdate ] = useState(false) */
  const realm = props.props
  const [ clickEvent, setClickEvent ] = useState(false)
  const [ img, setImg ] = useState('')
  const [userImages, setUserImages] = useState('')
  const [images, setImages] = useState([])
  useEffect(() => {
      loadImages().then(results => setImages(results)) 
    }, [])
  //const [images, setImages] = useState([
  //  {
  //    img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
  //    title: 1
  //  },
  //  {
  //    img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
  //    title: 2
  //  },
  //  {
  //    img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
  //    title: 3
  //  },
  //  {
  //    img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
  //    title: 4
  //  },
  //  {
  //    img: 'https://live.staticflickr.com/5088/5323961120_0172112bcb_b.jpg',
  //    title: 5
  //  },
  //])

  const dispatch = useDispatch()
  const selectedNetherPortal      = useSelector((state) => state.NetherPortals.selectedNetherPortal)  
  const allNetherPortals          = useSelector((state) => state.NetherPortals.allNetherPortals)
  const augmentPage               = useSelector((state) => state.NetherPortals.augment)
  const hasThisBeenRenderedBefore = useSelector((state) => state.NetherPortals.hasThisBeenRenderedBefore)
  const godie                     = useSelector((state) => state.NetherPortals.stageNetherPortalChanges)
  const netherPortalImages        = useSelector((state) => state.NetherPortals.netherPortalImages)
  const netherPortalImageFiles    = useSelector((state) => state.NetherPortals.netherPortalImageFiles)
  console.log('godie', godie)

  function handleImageClick(booly, img) {
    setClickEvent(booly)
    setImg(img)
  }
  function handleChangeText() {

  }

  function handleChange(change, id, index) {
    dispatch(stageOnChanges([change, id]))

    var update = structuredClone(godie)

    console.log(godie, update, index)
    update[index][realm][id] = change
    dispatch(stageOnChanges3x(update))
  }

  const textFields = [
      {id: 'xcord',  defaultValue: 'x-cord', objectKey: 'Xcord' , stupidKey: 0},
      {id: 'ycord',  defaultValue: 'y-cord', objectKey: 'Ycord' , stupidKey: 1},
      {id: 'zcord',  defaultValue: 'z-cord', objectKey: 'Zcord' , stupidKey: 2},
      {id: 'locale', defaultValue: 'locale', objectKey: 'Locale', stupidKey: 3},
      {id: 'owner',  defaultValue: 'owner',  objectKey: 'Owner' , stupidKey: 4},
   ]

  function getTable(tables) {
    for (const index of tables)  {
        if (selectedNetherPortal == index.Id) {
        return index
      }
    }
  }

  const ReturnDivsOrTextField = (array, augment) => {
      if (!augment) {
        console.log("TRUE")
        let outOfIdeasForVariables = godie[selectedNetherPortal[0]][realm]
        console.log(outOfIdeasForVariables)
        return (
            array.map((key) => (
            <input
              id={`${key.id}`}
              key={key.stupidKey}
              className='col p-2'
              defaultValue={`${key.defaultValue}: ${outOfIdeasForVariables[key.objectKey]}`}
              onChange={(e) => handleChange(e.target.value, key.objectKey, selectedNetherPortal[0])}
            ></input>
            ))
        ) 
      } else {
        
        return (
          array.map((key) => (
            <div
              id={`${key.id}`}
              key={key.stupidKey}
              className='col p-2 xlatrue'
            >{key.defaultValue}: {defaultValue[key.objectKey]}
            </div>
          ))
        )
      }
  }

  const handleImageChange = (e, dispatch, oldImages, oldImageFiles) => {
    e.preventDefault()
    var imageFile = URL.createObjectURL(e.target.files[0])
    var newImage = {
          img: imageFile,
          title: e.target.files[0].name,
        }
    setImages(oldArray => {
      return [
        ...oldArray,
        newImage,
      ]
    })
    console.log("breaker2", images)
    dispatch(stageNetherPortalImageChanges([...oldImages, newImage]))
    shoveImageIntoIndexedDB(imageFile, "DOES THIS WORK")

    //dispatch(stageNetherPortalImageFilesChanges([
    //  ...netherPortalImageFiles,
    //    newImage,
    //]))
  }

  let defaultValue
  const netherPortalChanges = useSelector((state) =>  state.NetherPortals.allNetherPortals)
  defaultValue = netherPortalChanges[selectedNetherPortal[0]][realm]
 
  if (defaultValue == undefined) {
    console.log('Nothing to see', defaultValue)
    return (
    <div>Nothing to see1</div>
    )
  } else {
    return (
      <div id='NetherPortals' className=''>
        <div id="Row1" className="row">
          {ReturnDivsOrTextField(textFields, augmentPage)}
      </div>

       <div id="Row2" className="row">

         <div id='ImageScroll' className='col-md-4'>  
           {
             images.map((image) => (
             <div key={`${image.title}`}>
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
        {textareaOrDiv(augmentPage)}
     </div>

     <div id='Row3' className='row'>
      {imageButton(augmentPage, handleImageChange, dispatch, netherPortalImages, netherPortalImageFiles)}
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

export default PortalTemplate
