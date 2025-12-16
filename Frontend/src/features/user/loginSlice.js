import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./usersSlice"; 

const tokenFromStorage = localStorage.getItem("userToken");
const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  isAuthenticated: !!tokenFromStorage || !!userFromStorage,
  currentUser: userFromStorage || null,
  token: tokenFromStorage || null,
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
        state.error = action.payload || "Falha no login";
      });
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
