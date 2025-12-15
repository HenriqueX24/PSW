import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  isAuthenticated: !!userFromStorage,
  currentUser: userFromStorage || null,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = null;
      state.token = action.payload.token;
    },

    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
