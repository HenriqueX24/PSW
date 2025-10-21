import React, { useEffect } from "react";
import "./FazerAvaliacao.css"; // <-- ALTERAÇÃO: Importa o arquivo CSS
import { useNavigate, useParams } from "react-router-dom";
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Typography, Box, Container } from "@mui/material";
import Title from "../../Components/Title";
import { useSelector, useDispatch } from 'react-redux';
import { selectAvaliacaoById, fetchAvaliacoes } from "../../features/user/avaliacaoSlice";
import FormsAvaliacao from "../../Components/FormsAvaliacao";

function FazerAvaliacao() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avaliacao = useSelector(state => selectAvaliacaoById(state, String(id)));
  const avaliacaoStatus = useSelector(state => state.avaliacoes.status);

  useEffect(() => {
    if (avaliacaoStatus === 'idle' || avaliacaoStatus === 'failed') {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacaoStatus, dispatch]);

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
    alert(`Avaliação "${avaliacao.titulo}" enviada com sucesso! (Simulação)`);
    navigate(-1);
  };

  if (avaliacaoStatus === 'loading' || avaliacaoStatus === 'idle') {
    return <Typography sx={{ p: 4 }}>Carregando Avaliação...</Typography>;
  }

  if (!avaliacao) {
    return <Typography sx={{ p: 4 }}>Avaliação com ID: {id} não encontrada.</Typography>;
  }

  return (
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
            <FormsAvaliacao avaliacao={avaliacao} />
          </div>
          <ButtonSubmit />
        </form>
      </main>
      <NavBar />
    </Box>
  );
}

export default FazerAvaliacao;