import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/user/usersSlice'; 
import loginReducer from '../features/user/loginSlice';
import { addNewMeta } from "../features/user/metaSlice";
import metasReducer from '../features/user/metaSlice';
import ciclosReducer from '../features/user/ciclosSlice';
import avaliacoesReducer from '../features/user/avaliacaoSlice';

export default configureStore({
  reducer: {
    avaliacoes: avaliacoesReducer,
    users: usersReducer, 
    login: loginReducer, 
    metas: metasReducer, 
    ciclos: ciclosReducer,
  },
});