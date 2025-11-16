import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';


const API_URL = 'http://localhost:4000/users/';


export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    try {
      // 1. Pegar o token do estado atual para autorizar a requisição
      const state = thunkAPI.getState();
      const token = state.login.currentUser?.token; 

      // Configurar o cabeçalho com o Token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(API_URL + 'profile', userData, config);

      return response.data; // Retorna o usuário atualizado + novo token
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
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
  isSuccess: false,
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
    resetUpdate: (state) => { 
        state.isSuccess = false;
        state.error = null;
    }
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetUpdate } = loginSlice.actions;

export default loginSlice.reducer;