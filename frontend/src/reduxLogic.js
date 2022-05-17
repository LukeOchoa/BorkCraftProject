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
  allNetherPortals: [],


}

export const NetherPortals = createSlice({
  name: 'netherPortals',
  initialState,
  reducers: {
    updateNetherPortalsForm: (state, formObject) => {
      const wholeObject = formObject.payload
      state.allNetherPortals = wholeObject
    },
    allowPageUpdate: (state) => {
      state.augment = !state.augment
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

export const { updateNetherPortalsForm, allowPageUpdate, hasThisBeenRenderedBeforeFunc} = NetherPortals.actions


export default NetherPortals.reducer
