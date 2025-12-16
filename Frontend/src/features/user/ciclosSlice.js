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

export const fetchCiclos = createAsyncThunk("ciclos/fetchCiclos", async () => {
  // 1. Obter o token de autenticação
  const token = localStorage.getItem("userToken"); //armazena o token aqui

  // *** ADICIONE ESTE LOG PARA DEBUG ***
  console.log("Token para fetchCiclos:", token);

  if (!token) {
    // Você pode lançar um erro mais explícito ou apenas deixar que a chamada falhe,
    // mas é melhor garantir que a requisição só ocorra se o token existir.
    throw new Error("Token de autenticação não encontrado. Faça login.");
  }

  // 2. Incluir o token no cabeçalho 'Authorization'
  const response = await fetch("http://localhost:3001/ciclos", {
    headers: {
      // O esquema 'Bearer' é o mais comum para tokens JWT
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // 3. Opcional: Tratar a resposta 401/403 aqui se precisar de lógica específica
  if (!response.ok) {
    // Isso fará com que a thunk caia no .rejected
    throw new Error("Falha na autenticação ou autorização.");
  }

  return response.json();
});
export const addNewCiclo = createAsyncThunk(
  "ciclos/addNewCiclo",
  async (novoCiclo) => {
    const response = await fetch("http://localhost:3001/ciclos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCiclo),
    });
    return response.json();
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
        ciclosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCiclos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewCiclo.fulfilled, ciclosAdapter.addOne);
  },
});

export const { selectAll: selectAllCiclos, selectById: selectCicloById } =
  ciclosAdapter.getSelectors((state) => state.ciclos);

export default ciclosSlice.reducer;
