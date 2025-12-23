import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import { API_URL } from "../../config/api";

const avaliacoesAdapter = createEntityAdapter({
  selectId: (a) => a._id,
});

const initialState = avaliacoesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAvaliacoes = createAsyncThunk(
  "avaliacoes/fetchAvaliacoes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().login?.token;

      const response = await fetch(`${API_URL}/avaliacoes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);

      return data;
    } catch (err) {
      return rejectWithValue({ msg: "Erro ao buscar avaliações" });
    }
  }
);


export const addNewAvaliacao = createAsyncThunk(
  "avaliacoes/addNewAvaliacao",
  async (novaAvaliacao, { getState, rejectWithValue }) => {
    try {
      const token = getState().login?.token; 

      const response = await fetch(`${API_URL}/avaliacoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novaAvaliacao),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (err) {
      return rejectWithValue({ msg: "Erro de rede/servidor" });
    }
  }
);
export const fetchMinhasAvaliacoes = createAsyncThunk(
  "avaliacoes/fetchMinhasAvaliacoes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().login?.token;

      const response = await fetch(`${API_URL}/avaliacoes/minhas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);

      return data; // array
    } catch (err) {
      return rejectWithValue({ msg: "Erro ao buscar minhas avaliações" });
    }
  }
);

export const responderAvaliacao = createAsyncThunk(
  "avaliacoes/responderAvaliacao",
  async ({ avaliacaoId, respostas }, { getState, rejectWithValue }) => {
    try {
      const token = getState().login?.token;

      const response = await fetch(`${API_URL}/avaliacoes/${avaliacaoId}/responder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ respostas }),
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);

      return data; // avaliação atualizada
    } catch (err) {
      return rejectWithValue({ msg: "Erro ao responder avaliação" });
    }
  }
);



export const updateAvaliacao = createAsyncThunk(
  "avaliacoes/updateAvaliacao",
  async (avaliacaoAtualizada) => {
    const id = avaliacaoAtualizada._id;
    //fetch(`http://localhost:3001/avaliacoes/${id}`)
    const response = await fetch(`${API_URL}/avaliacoes/${id}`, {
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
    await fetch(`${API_URL}/avaliacoes/${avaliacaoId}`, {
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
      .addCase(deleteAvaliacao.fulfilled, avaliacoesAdapter.removeOne)

      // Minhas avaliações (aplicadas)
      .addCase(fetchMinhasAvaliacoes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMinhasAvaliacoes.fulfilled, (state, action) => {
        state.status = "succeeded";
        avaliacoesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMinhasAvaliacoes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Responder avaliação aplicada
      .addCase(responderAvaliacao.fulfilled, (state, action) => {
        avaliacoesAdapter.upsertOne(state, action.payload);
      })
      .addCase(responderAvaliacao.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
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
