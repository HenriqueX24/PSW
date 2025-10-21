import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

// O Entity Adapter nos ajuda a gerenciar dados normalizados (como um banco de dados em miniatura)
const avaliacoesAdapter = createEntityAdapter({});

// Estado inicial, incluindo status para controle de loading/erros
const initialState = avaliacoesAdapter.getInitialState({
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

// Thunk para BUSCAR todas as avaliações da API
export const fetchAvaliacoes = createAsyncThunk(
  "avaliacoes/fetchAvaliacoes",
  async () => {
    const response = await fetch("http://localhost:3001/avaliacoes");
    const data = await response.json();
    return data;
  }
);

// Thunk para ADICIONAR uma nova avaliação na API
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
    return data; // Retorna a avaliação criada (com ID)
  }
);

// Thunk para ATUALIZAR uma avaliação existente
export const updateAvaliacao = createAsyncThunk(
  "avaliacoes/updateAvaliacao",
  async (avaliacaoAtualizada) => {
    const { id } = avaliacaoAtualizada;
    const response = await fetch(`http://localhost:3001/avaliacoes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avaliacaoAtualizada),
    });
    const data = await response.json();
    return data;
  }
);

// Thunk para DELETAR uma avaliação
export const deleteAvaliacao = createAsyncThunk(
  "avaliacoes/deleteAvaliacao",
  async (avaliacaoId) => {
    await fetch(`http://localhost:3001/avaliacoes/${avaliacaoId}`, {
      method: "DELETE",
    });
    return avaliacaoId; // Retorna o ID da avaliação removida
  }
);

const avaliacaoSlice = createSlice({
  name: "avaliacoes",
  initialState,
  reducers: {},
  // extraReducers lidam com as ações geradas pelos createAsyncThunk
  extraReducers(builder) {
    builder
      // Casos para fetchAvaliacoes
      .addCase(fetchAvaliacoes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
        state.status = "succeeded";
        avaliacoesAdapter.setAll(state, action.payload); // Adiciona todas as avaliações ao estado
      })
      .addCase(fetchAvaliacoes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Caso para addNewAvaliacao
      .addCase(addNewAvaliacao.fulfilled, avaliacoesAdapter.addOne) // Adiciona a nova avaliação
      // Caso para updateAvaliacao
      .addCase(updateAvaliacao.fulfilled, avaliacoesAdapter.upsertOne) // Atualiza ou insere
      // Caso para deleteAvaliacao
      .addCase(deleteAvaliacao.fulfilled, avaliacoesAdapter.removeOne); // Remove pelo ID
  },
});

// Exporta os seletores gerados pelo adapter para buscar os dados nos componentes
export const {
  selectAll: selectAllAvaliacoes,
  selectById: selectAvaliacaoById,
  selectIds: selectAvaliacaoIds,
} = avaliacoesAdapter.getSelectors((state) => state.avaliacoes);

// Filtra as avaliações com status "Respondida"
// Você pode precisar ajustar o status 'Respondida' para o valor real usado no seu banco de dados.
export const selectAvaliacoesRespondidas = createSelector(
  [selectAllAvaliacoes],
  (avaliacoes) => avaliacoes.filter((avaliacao) => avaliacao.status === "Respondida")
);

export default avaliacaoSlice.reducer;