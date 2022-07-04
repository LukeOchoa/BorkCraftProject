import {useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allowPageUpdate, updateChosenNetherPortal, reRender, updateNetherPortalsForm, stageOnChanges3x } from '../../reduxLogic'

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const ButtonBar = (props) => {
  const [ showDropdown, setShowDropdown ] = useState(false)

  let stageNetherPortalChanges = useSelector((state) => state.NetherPortals.stageNetherPortalChanges)
  let allImages                = useSelector((state) => state.NetherPortals.netherPortalImages)
  let allImageFiles            = useSelector((state) => state.NetherPortals.netherPortalImageFiles)
  const allNetherPortals       = useSelector((state) => state.NetherPortals.allNetherPortals)
  const augment                = useSelector((state) => state.NetherPortals.augment)

  const dropDownArray = useSelector((state) => {
    var allNetherPortals = state.NetherPortals.allNetherPortals
    console.log('allNetherPortal', allNetherPortals)
    var portalArray = []
    for (var index = 0; index<allNetherPortals.length; index++) {

      var id = allNetherPortals[index].Id
      var key = allNetherPortals[index].OverWorld
      portalArray.push([index, "[Pair ", id, "]", 'OverWorld', " x: ", key.Xcord, " y: ", key.Ycord, " z: ", key.Zcord, ' ', 1])

      var id = allNetherPortals[index].Id
      var key = allNetherPortals[index].Nether
      portalArray.push([index, "[Pair ", id, "]", 'OverWorld', " x: ", key.Xcord, " y: ", key.Ycord, " z: ", key.Zcord, ' ', 1])
    }
    return portalArray
  })
  for (var x = 0; x<dropDownArray.length; x++) {
    dropDownArray[x].push(x)
  }


  const dispatch = useDispatch()

  const handleSubmit = () => {
    console.log('nether portal changes staged for change', stageNetherPortalChanges, allImages, allImageFiles)
  }

  const handleClick = (x, y) => {
    dispatch(reRender())
    dispatch(stageOnChanges3x(allNetherPortals))
    dispatch(updateChosenNetherPortal( [x, y] ))
    if (!augment) {
      dispatch(allowPageUpdate())
    }
  }

  return (
    <div> 

      <header className="hx">Over World Co-ordinates</header>
      <div className='row p-2'>
        <Button className='col btn btn-dark btn-sm' onClick={() => dispatch(allowPageUpdate())}>augment</Button>
        <Button className='col btn btn-dark btn-sm' type='submit' onClick={handleSubmit}>submit</Button>

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
              dropDownArray.map((item) => (
              <Dropdown.Item key={item[13]} onClick={() => handleClick(item[0], item[2])}>{item}</Dropdown.Item>
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

export default ButtonBar
