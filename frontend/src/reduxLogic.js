import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stringy: 'redux',
  hasThisBeenRenderedBefore: false,
  /*  // add an images object
  formDataOverWorld: {
    xcord:  null,
    ycord:  null,
    zcord:  null,
    locale: null,
    owner:  null,
    notes:  null,
  },
  formDataNether: {
      xcord:  null,
      ycord:  null,
      zcord:  null,
      locale: null,
      owner:  null,
      notes:  null,
    }, */
  augment: true,   /* false for: Not Read Only, Allow updates to the page */
  selectedNetherPortal: [0, 0],
  allNetherPortals: [0],
  stageNetherPortalChanges: [],
  testChange: '',
  testObj: [],

  render: false,

  netherPortalChanges: [],
  netherPortalImages: [],
  netherPortalImageFiles: [],
  netherPortalNotes: [],
}

export const NetherPortals = createSlice({
  name: 'netherPortals',
  initialState,
  reducers: {
    updateNetherPortalsForm: (state, formObject) => {
      const wholeObject = formObject.payload
      state.allNetherPortals = wholeObject
      state.testObj = wholeObject
      state.stageNetherPortalChanges = wholeObject 
    },
    allowPageUpdate: (state) => {
      state.augment = !state.augment
    },
    stageOnChanges: (state, newChange) => {
      state.testChange = newChange.payload
      console.log(newChange.payload)
      /*
     var rval 
      for (const item of state.testObj) {
        console.log('immer item?', item, state.testObj, state.allNetherPortals)
        if (state.testObj[item]['Id'] == state.selectedNetherPortal)
          rval = item
      }
      state.testObj[rval][key][key2] = newChange.payload
    */
    },
    stageOnChanges3x: (state, change) => {
      console.log("ok lol")
     state.stageNetherPortalChanges = change.payload
    },
    stateOnChanges2: (state, newChange) => {
      state.testObj = newChange.payload
    },
    updateChosenNetherPortal: (state, portal) => {

      state.selectedNetherPortal = portal.payload
    },
    reRender: (state) => {
      state.render = !state.render 
    },
    stageNetherPortalImageChanges: (state, images) => {
      state.netherPortalImages = images.payload
    },
    stageNetherPortalImageFilesChanges: (state, imageFiles) => {
      state.netherPortalImageFiles = imageFiles.payload
    },
    stageNetherPortalTextChanges: (state, texts) => {
      state.netherPortalText = texts.payload
    },



    hasThisBeenRenderedBeforeFunc: (state) => {
      state.hasThisBeenRenderedBefore = !state.hasThisBeenRenderedBefore
    },
    
  }

})

/*
export const reduxLogic = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    loggy: (state, statey) => {
      console.log("do you hate me")
      state.stringy = statey.payload
    }
  }
})
*/

export const { updateNetherPortalsForm, 
               allowPageUpdate, 
               hasThisBeenRenderedBeforeFunc, 
               stageOnChanges,
               updateChosenNetherPortal, 
               stateOnChanges2, 
               stageOnChanges3x,
               reRender,
               stageNetherPortalImageChanges,
               stageNetherPortalImageFilesChanges,
              } = NetherPortals.actions


export default NetherPortals.reducer
