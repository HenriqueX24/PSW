import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const metasAdapter = createEntityAdapter({
  selectId: (instance) => instance._id || instance.id,
});

const initialState = metasAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchMetas = createAsyncThunk("metas/fetchMetas", async () => {
  const response = await fetch("http://localhost:3001/metas");
  const data = await response.json();
  return data;
});

export const addNewMeta = createAsyncThunk(
  "metas/addNewMeta",
  async (novaMeta, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/metas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaMeta),
      });
      if (!response.ok) {
        // Tenta extrair mensagem de erro do backend (pode ser HTML ou JSON)
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateMeta = createAsyncThunk(
  "metas/updateMeta",
  async (metaAtualizada) => {
    const id = metaAtualizada._id || metaAtualizada.id;
    const response = await fetch(`http://localhost:3001/metas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaAtualizada),
    });

    if (!response.ok){
      throw new Error('Erro ao atualizar no servidor');
    }

    const data = await response.json();
    return data;
  }
);
export const deleteMeta = createAsyncThunk(
  "metas/deleteMeta",
  async (metaId) => {
    await fetch(`http://localhost:3001/metas/${metaId}`, {
      method: "DELETE",
    });
    return metaId;
  }
);

const metaSlice = createSlice({
  name: "metas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMetas.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMetas.fulfilled, (state, action) => {
        state.status = "succeeded";
        metasAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMetas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewMeta.fulfilled, metasAdapter.addOne)
      .addCase(updateMeta.fulfilled, metasAdapter.upsertOne)
      .addCase(deleteMeta.fulfilled, (state, action) => {
        metasAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllMetas,
  selectById: selectMetaById,
  selectIds: selectMetaIds,
} = metasAdapter.getSelectors((state) => state.metas);

export const selectMetasConcluidas = createSelector([selectAllMetas], (metas) =>
  metas.filter((meta) => meta.status === "Concluída")
);

export default metaSlice.reducer;
