import { createSlice, createAsyncThunk, createEntityAdapter  } from '@reduxjs/toolkit';


const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', 
  async () => {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    return data;
  }
);
const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
});
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
      });
  },
});
export const { addUser } = usersSlice.actions;
export const {
  selectAll: selectAllUsers, 
  selectById: selectUserById, 
} = usersAdapter.getSelectors(state => state.users);
export default usersSlice.reducer;