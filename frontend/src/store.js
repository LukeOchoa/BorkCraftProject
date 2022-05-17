import { configureStore } from "@reduxjs/toolkit";
import reduxLogic from './reduxLogic';
import NetherPortals from './reduxLogic';

export const store = configureStore({
  reducer: {
    funky: reduxLogic,
    NetherPortals: NetherPortals,
  }
})

