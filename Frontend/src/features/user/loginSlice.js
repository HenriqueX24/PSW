import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  isAuthenticated: !!userFromStorage,
  currentUser: userFromStorage || null,
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

    logout: () => initialState,
      
      //localStorage.removeItem("currentUser");
      //localStorage.removeItem("userToken");
    resetUpdate: (state) => {
      state.isSucsess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("loginUser/fulfilled", (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
