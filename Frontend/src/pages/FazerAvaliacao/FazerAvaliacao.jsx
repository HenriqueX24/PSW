import React, { useState, useEffect } from "react";
import "./FazerAvaliacao.css";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Typography, Box, Container } from "@mui/material";
// Componentes estáticos removidos: SurveyForm, Slider
import { useSelector, useDispatch } from "react-redux";
import {
  selectAvaliacaoById,
  fetchAvaliacoes,
  updateAvaliacao,
} from "../../features/user/avaliacaoSlice";
import FormsAvaliacao from "../../Components/FormsAvaliacao"; // Importa o FormsAvaliacao
import Title from "../../Components/Title";

/**
 * Página "Fazer Avaliação".
 *
 * Permite que um usuário *responda* a um modelo de avaliação.
 * 1. Obtém o `id` da avaliação da URL (via `useParams`).
 * 2. Busca/Seleciona a avaliação específica do `avaliacaoSlice` do Redux.
 * 3. Renderiza o componente `FormsAvaliacao`, que gera dinamicamente
 * os inputs (Slider, Múltipla Escolha) com base nas 'questoes' da avaliação.
 * 4. Recebe as respostas do usuário através do callback `handleRespostasChange`.
 * 5. Ao submeter, valida se todas as questões foram respondidas.
 * 6. Despacha a ação `updateAvaliacao` para salvar as `respostas` no objeto
 * da avaliação, marcando-a como "Respondida".
 *
 * @returns {JSX.Element} A página para responder uma avaliação.
 */
function FazerAvaliacao() {
  const { id } = useParams(); // Obtém o ID da URL
  const dispatch = useDispatch();

  // Busca a avaliação pelo ID do estado do Redux
  const avaliacao = useSelector((state) =>
    selectAvaliacaoById(state, String(id))
  );
  const avaliacaoStatus = useSelector((state) => state.avaliacoes.status);

  // Estado local para armazenar as respostas (ex: { "questaoId": "resposta" })
  const [respostasAvaliacao, setRespostasAvaliacao] = useState({});

  const navigate = useNavigate();

  // Carrega as avaliações se necessário (ex: se o usuário recarregar a página)
  useEffect(() => {
    if (avaliacaoStatus === "idle" || avaliacaoStatus === "failed") {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacaoStatus, dispatch]);

  const handleVoltar = () => {
    navigate("/ciclo-revisao");
  };

  // Callback para receber as respostas do FormsAvaliacao (componente filho)
  const handleRespostasChange = (novasRespostas) => {
    setRespostasAvaliacao(novasRespostas);
  };

  // Função de submissão do formulário preenchido
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!avaliacao) {
      alert("Avaliação não carregada.");
      return;
    }

    // Lógica de Validação: Verifica se todas as questões foram respondidas
    const totalQuestoes = avaliacao.questoes.length;
    const totalRespostas = Object.keys(respostasAvaliacao).length;

    if (totalRespostas < totalQuestoes) {
      alert(
        `Por favor, responda todas as ${totalQuestoes} questões antes de enviar. (${totalRespostas} respondidas)`
      );
      return;
    }

    // Preparar o objeto de atualização
    const avaliacaoPreenchida = {
      ...avaliacao,
      respostas: respostasAvaliacao, // Salva o snapshot das respostas
      status: "Respondida", // Marca como respondida
      dataResposta: new Date().toISOString(), // Adiciona o timestamp para ordenação
    };

    // Enviar a atualização via Thunk
    dispatch(updateAvaliacao(avaliacaoPreenchida))
      .unwrap()
      .then(() => {
        alert(`Avaliação "${avaliacao.titulo}" enviada com sucesso e salva!`);
        navigate(-1); // Volta para a página anterior
      })
      .catch((error) => {
        alert(`Erro ao salvar a avaliação: ${error.message}`);
      });
  };

  // --- Renderização Condicional ---
  if (avaliacaoStatus === "loading" || avaliacaoStatus === "idle") {
    return <Typography sx={{ p: 4 }}>Carregando Avaliação...</Typography>;
  }

  if (!avaliacao) {
    return (
      <Typography sx={{ p: 4 }}>
        Avaliação com ID: {id} não encontrada.
      </Typography>
    );
  }

  return (
    <>
      {/* ... (Header e MenuNav) ... */}
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        {/* Bloco de cabeçalho com as classes para o CSS */}
        <Container
          maxWidth="lg"
          className="cabecalho" //  Adicionada classe para o container
          sx={{
            // As propriedades de display e alinhamento foram movidas para o CSS
            // para que a media query possa controlá-las.
            py: 3,
          }}
        >
          <button
            type="button"
            className="botao-voltar" // <-- ALTERAÇÃO: Classe para o botão
            aria-label="Voltar"
            onClick={() => navigate(-1)}
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="#7ED6C0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Title
            titulo={avaliacao.titulo || "Fazer Avaliação"}
            className="titulo-pagina" // <-- ALTERAÇÃO: Adicionada classe para o título
          />
        </Container>
        <MenuNav />
        <main>
          {/* Formulário de Avaliação */}
          <form className="autoavaliacao-form" onSubmit={handleSubmit}>
            <div className="form-section">
              {/* NOVO: Usa o componente reutilizável FormsAvaliacao */}
              <FormsAvaliacao
                avaliacao={avaliacao}
                onRespostasChange={handleRespostasChange}
              />
            </div>
            <ButtonSubmit />
          </form>
        </main>

        <NavBar />
      </Box>
    </>
  );
}

export default FazerAvaliacao;
