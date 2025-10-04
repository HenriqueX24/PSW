import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/user/usersSlice'; 
import loginReducer from '../features/user/loginSlice';

export default configureStore({
  reducer: {
    users: usersReducer, 
    login: loginReducer, 
  },
});