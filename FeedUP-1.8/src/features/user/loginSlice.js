import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, 
  currentUser: null,      
  error: null,           
};

export const loginSlice  = createSlice({
  name: 'login',
  initialState,
  reducers: {
  
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload; 
      state.error = null;
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