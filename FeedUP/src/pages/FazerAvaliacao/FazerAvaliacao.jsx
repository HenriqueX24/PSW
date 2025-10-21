import React, { useState, useEffect } from "react";
import "./FazerAvaliacao.css";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Typography, Box, Container } from "@mui/material";
// Componentes estáticos removidos: SurveyForm, Slider
import { useSelector, useDispatch } from 'react-redux';
import { selectAvaliacaoById, fetchAvaliacoes, updateAvaliacao } from "../../features/user/avaliacaoSlice";
import FormsAvaliacao from "../../Components/FormsAvaliacao"; // Importa o FormsAvaliacao
import Title from "../../Components/Title"

function FazerAvaliacao() {
  const { id } = useParams(); // Obtém o ID da URL
  const dispatch = useDispatch();
  
  // Busca a avaliação pelo ID do estado do Redux
  const avaliacao = useSelector(state => selectAvaliacaoById(state, String(id)));
  const avaliacaoStatus = useSelector(state => state.avaliacoes.status);

  // Estado para armazenar as respostas
  const [respostasAvaliacao, setRespostasAvaliacao] = useState({});

  const navigate = useNavigate();

  // Carrega as avaliações se necessário
  useEffect(() => {
    if (avaliacaoStatus === 'idle' || avaliacaoStatus === 'failed') {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacaoStatus, dispatch]);
  
  const handleVoltar = () => {
    navigate("/ciclo-revisao");
  };

  // Callback para receber as respostas do FormsAvaliacao
  const handleRespostasChange = (novasRespostas) => {
      setRespostasAvaliacao(novasRespostas);
  }

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
        alert(`Por favor, responda todas as ${totalQuestoes} questões antes de enviar. (${totalRespostas} respondidas)`);
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
            navigate(-1); 
        })
        .catch((error) => {
            alert(`Erro ao salvar a avaliação: ${error.message}`);
        }); 
  };

  // --- Renderização Condicional ---
  if (avaliacaoStatus === 'loading' || avaliacaoStatus === 'idle') {
    return <Typography sx={{ p: 4 }}>Carregando Avaliação...</Typography>;
  }
  
  if (!avaliacao) {
    return <Typography sx={{ p: 4 }}>Avaliação com ID: {id} não encontrada.</Typography>;
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
        <form className="autoavaliacao-form" onSubmit={handleSubmit}>
          <div className="form-section">
            {/* NOVO: Usa o componente reutilizável FormsAvaliacao */}
            <FormsAvaliacao avaliacao={avaliacao} onRespostasChange={handleRespostasChange}/> 
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