import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // O estado para esta funcionalidade será uma lista de usuários
  userList: [], 
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  // O redutor que define a ação de adicionar um novo usuário
  reducers: {
    addUser: (state, action) => {
      // action.payload será o objeto do novo usuário vindo do seu formulário
      state.userList.push(action.payload);
    },
  },
});

// Exporta a ação 'addUser' para que o componente 'CriarConta' possa usá-la
export const { addUser } = usersSlice.actions;

// Exporta o redutor para a gente registrar na store
export default usersSlice.reducer;