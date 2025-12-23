import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const ciclosAdapter = createEntityAdapter({
  selectId: (ciclo) => ciclo._id || ciclo.id,
});

const initialState = ciclosAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Função auxiliar para pegar os headers (evita repetição de código)
const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchCiclos = createAsyncThunk("ciclos/fetchCiclos", async (_, { rejectWithValue }) => {
  try{
    const token = localStorage.getItem("userToken"); //armazena o token aqui
    const response = await fetch("http://localhost:3001/ciclos", {
      method: "GET",
      headers: getAuthHeaders(),
  });

    const data = await response.json();

    if (!response.ok) {
    // Se o status for 400, o erro será capturado aqui
      return rejectWithValue(data.msg || "Erro na requisição de ciclos");
    }
    return data;
  } catch (error){
    return rejectWithValue(error.message);
  }
  

  /*** ADICIONE ESTE LOG PARA DEBUG ***
  console.log("Token para fetchCiclos:", token);*/

  /*if (!token) {
    // Você pode lançar um erro mais explícito ou apenas deixar que a chamada falhe,
    // mas é melhor garantir que a requisição só ocorra se o token existir.
    throw new Error("Token de autenticação não encontrado. Faça login.");
  }*/  
});
export const addNewCiclo = createAsyncThunk(
  "ciclos/addNewCiclo",
  async (novoCiclo, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem('userToken'); //Pegar o token do storage
      const response = await fetch("http://localhost:3001/ciclos", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(novoCiclo),
      });  

      const data = await response.json();

      if(!response.ok){
        return rejectWithValue(data.msg || data || "Erro ao criar ciclo");
      }

      return data;
    } catch (error){
      return rejectWithValue(error.message);
    }
  }
);

const ciclosSlice = createSlice({
  name: "ciclos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCiclos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCiclos.fulfilled, (state, action) => {
        state.status = "succeeded";
        if(Array.isArray(action.payload)) {
          ciclosAdapter.setAll(state, action.payload);
        }
      })
      .addCase(fetchCiclos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(addNewCiclo.fulfilled, (state, action) => {
        ciclosAdapter.addOne(state, action.payload)
      });
  },
});

export const { selectAll: selectAllCiclos, selectById: selectCicloById } =
  ciclosAdapter.getSelectors((state) => state.ciclos);

export default ciclosSlice.reducer;
