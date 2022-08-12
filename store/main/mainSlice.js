import {createSlice} from "@reduxjs/toolkit";
import {theme, sideNavigation} from "../../helpers/keys";

const initialState = {
  theme: "light",
  sideNavigation: false
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSideNavigation: (state, {payload}) => {
      state.sideNavigation = payload
      localStorage.setItem(sideNavigation, payload)
    },
    setTheme: (state, {payload}) => {
      state.theme = payload
      localStorage.setItem(theme, payload)
    }
  }
})

export const { setSideNavigation, setTheme } = mainSlice.actions
