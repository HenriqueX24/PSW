import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { API_URL } from "../../config/api";

const usersAdapter = createEntityAdapter({
  // backend (Mongo) usa _id; json-server usa id.
  selectId: (users) => users._id || users.id,
});

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Função auxiliar para evitar o erro "Bearer null"
const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    //const token = localStorage.getItem("userToken");

    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if(!response.ok){
      return rejectWithValue(data.msg || "Erro ao buscar usuários");
    }

    return data;

  } catch( error ){
    return rejectWithValue(error.message);
  } 
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (newUser, {rejectWithValue}) => {
    try{
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    const data = await response.json();

      if(!response.ok){
        return rejectWithValue( data.msg || "Erro ao criar usuário");
      }

    return data;
    
  } catch (error){
    return rejectWithValue(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, {rejectWithValue}) => {
    try{
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userAtualizado, { rejectWithValue }) => {
    // Pegue o token do localStorage
    //const token = localStorage.getItem("userToken");
    try{
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(userAtualizado),
    });
    const data = await response.json();

    if(!response.ok){
      return rejectWithValue( data.msg || "Erro ao atualizar");
    }

    return data;
    } catch (error){
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ identifier, senha }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, senha }), // O backend espera `email` e `senha`
      });
      const data = await response.json();
      // Se a resposta não for 2xx, lance um erro
      if (!response.ok) {
        return rejectWithValue(data.msg || "Falha na autenticação");
      }

      return data; // Retorna o token e os dados do usuário
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";

        if(Array.isArray(action.payload)){
          usersAdapter.setAll(state, action.payload);
        } 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || action.payload;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        // Se o backend retornar só uma mensagem, não tenta enfiar isso no adapter.
        if (action.payload && (action.payload._id || action.payload.id)) {
          usersAdapter.addOne(state, action.payload);
        }
      });
  },
});

export const { addUser } = usersSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
  
export default usersSlice.reducer;
