import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const ciclosAdapter = createEntityAdapter();

const initialState = ciclosAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchCiclos = createAsyncThunk("ciclos/fetchCiclos", async () => {
  const response = await fetch("http://localhost:4000/ciclos");
  return response.json();
});

export const addNewCiclo = createAsyncThunk(
  "ciclos/addNewCiclo",
  async (novoCiclo) => {
    const response = await fetch("http://localhost4000/ciclos", {
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
