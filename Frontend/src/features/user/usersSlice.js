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
  return userId; 
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
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
      })
      .addCase(addNewUser.fulfilled, usersAdapter.addOne);
  },
});

export const { addUser } = usersSlice.actions;

export const {
  selectAll: selectAllUsers, 
  selectById: selectUserById, 
} = usersAdapter.getSelectors(state => state.users);
export default usersSlice.reducer;
