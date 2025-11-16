import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const metasAdapter = createEntityAdapter({});
const initialState = metasAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchMetas = createAsyncThunk("metas/fetchMetas", async () => {
  const response = await fetch("http://localhost:4000/metas");
  const data = await response.json();
  return data;
});

export const addNewMeta = createAsyncThunk(
  "metas/addNewMeta",
  async (novaMeta) => {
    const response = await fetch("http://localhost:4000/metas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaMeta),
    });
    const data = await response.json();
    return data;
  }
);

export const updateMeta = createAsyncThunk(
  "metas/updateMeta",
  async (metaAtualizada) => {
    const { id } = metaAtualizada;
    const response = await fetch(`http://localhost:4000/metas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaAtualizada),
    });
    const data = await response.json();
    return data;
  }
);
export const deleteMeta = createAsyncThunk(
  "metas/deleteMeta",
  async (metaId) => {
    await fetch(`http://localhost:4000/metas/${metaId}`, {
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


export const selectMetasConcluidas = createSelector(
  [selectAllMetas],
  (metas) => metas.filter((meta) => meta.status === "Concluída")
);

export default metaSlice.reducer;
