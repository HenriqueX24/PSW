import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const avaliacoesAdapter = createEntityAdapter({
  selectId: (a) => a._id,
});

const initialState = avaliacoesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAvaliacoes = createAsyncThunk(
  "avaliacoes/fetchAvaliacoes",
  async () => {
    const response = await fetch("http://localhost:3001/avaliacoes");
    const data = await response.json();
    return data;
  }
);

export const addNewAvaliacao = createAsyncThunk(
  "avaliacoes/addNewAvaliacao",
  async (novaAvaliacao) => {
    const response = await fetch("http://localhost:3001/avaliacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaAvaliacao),
    });
    const data = await response.json();
    return data;
  }
);

export const updateAvaliacao = createAsyncThunk(
  "avaliacoes/updateAvaliacao",
  async (avaliacaoAtualizada) => {
    const id = avaliacaoAtualizada._id;
    fetch(`http://localhost:3001/avaliacoes/${id}`)
    const response = await fetch(`http://localhost:3001/avaliacoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avaliacaoAtualizada),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteAvaliacao = createAsyncThunk(
  "avaliacoes/deleteAvaliacao",
  async (avaliacaoId) => {
    await fetch(`http://localhost:3001/avaliacoes/${avaliacaoId}`, {
      method: "DELETE",
    });
    return avaliacaoId;
  }
);

const avaliacaoSlice = createSlice({
  name: "avaliacoes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAvaliacoes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
        state.status = "succeeded";
        avaliacoesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAvaliacoes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewAvaliacao.fulfilled, avaliacoesAdapter.addOne)
      .addCase(updateAvaliacao.fulfilled, avaliacoesAdapter.upsertOne)
      .addCase(deleteAvaliacao.fulfilled, avaliacoesAdapter.removeOne);
  },
});

export const {
  selectAll: selectAllAvaliacoes,
  selectById: selectAvaliacaoById,
  selectIds: selectAvaliacaoIds,
} = avaliacoesAdapter.getSelectors((state) => state.avaliacoes);

export const selectAvaliacoesRespondidas = createSelector(
  [selectAllAvaliacoes],
  (avaliacoes) =>
    avaliacoes.filter((avaliacao) => avaliacao.status === "Respondida")
);

export default avaliacaoSlice.reducer;
