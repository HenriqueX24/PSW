import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';


const API_URL = 'http://localhost:4000/users/';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, thunkAPI) => {
    try {

      const response = await axios.post(API_URL + 'login', credentials);

      return response.data;
    } catch (error) {

      if (error.response) {
        const message =
          error.response.data && error.response.data.msg
            ? error.response.data.msg
            : error.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  isLoading: false, 
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload; 
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.payload; 
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;