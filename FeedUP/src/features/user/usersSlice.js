<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // O estado para esta funcionalidade será uma lista de usuários
  userList: [], 
};
=======
import { createSlice, createAsyncThunk, createEntityAdapter  } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

export const addNewUser = createAsyncThunk('users/addNewUser', async (newUser) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  return data;
});
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await fetch(`http://localhost:3001/users/${userId}`, {
    method: 'DELETE',
  });
  return userId; // Retorna o ID do usuário deletado
});


export const updateUser = createAsyncThunk('users/updateUser', async (userAtualizado) => {
  const { id } = userAtualizado;
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userAtualizado),
  });
  const data = await response.json();
  return data;
});


const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', 
  async () => {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    return data;
  }
);
>>>>>>> RefazendoFront

export const usersSlice = createSlice({
  name: 'users',
  initialState,
<<<<<<< HEAD
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
=======
  reducers: {
    addUser: usersAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'; 
      }) 
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        usersAdapter.setAll(state, action.payload);
      }) 
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message;
      });
  },
});

export const { addUser } = usersSlice.actions;

export const {
  selectAll: selectAllUsers, 
  selectById: selectUserById, 
} = usersAdapter.getSelectors(state => state.users);
>>>>>>> RefazendoFront
export default usersSlice.reducer;