import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD

import usersReducer from '../features/user/usersSlice'; 

export default configureStore({
  reducer: {
    users: usersReducer, 
=======
import usersReducer from '../features/user/usersSlice'; 
import loginReducer from '../features/user/loginSlice';
import { addNewMeta } from "../features/user/metaSlice";
import metasReducer from '../features/user/metaSlice';
import ciclosReducer from '../features/user/ciclosSlice';
export default configureStore({
  reducer: {
    users: usersReducer, 
    login: loginReducer, 
    metas: metasReducer, 
    ciclos: ciclosReducer,
>>>>>>> RefazendoFront
  },
});