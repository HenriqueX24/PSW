import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import "./CriarAvaliacao.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardQuestao from "../../Components/CardQuestao";
import ButtonCreate from "../../Components/ButtonCreate";
import NavBar from "../../Components/NavBar";
import { useDispatch } from "react-redux";
import { addNewAvaliacao } from "../../features/user/avaliacaoSlice";
import Title from "../../Components/Title";

function CriarAvaliacao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [questoes, setQuestoes] = useState([]);

  const adicionarQuestao = () => {
    const novaQuestao = {
      id: Date.now(),
      enunciado: "",
      tipo: "multipla_escolha",
      opcoes: [
        { id: 1, texto: "" },
        { id: 2, texto: "" },
        { id: 3, texto: "" },
        { id: 4, texto: "" },
      ],
      slider: { min: 0, max: 10, step: 1, labelMin: "Baixo", labelMax: "Alto" },
    };
    setQuestoes([...questoes, novaQuestao]);
  };

  const removerQuestao = (id) => {
    setQuestoes(questoes.filter((q) => q.id !== id));
  };

  const atualizarQuestao = (id, novosDados) => {
    setQuestoes(
      questoes.map((q) => (q.id === id ? { ...q, ...novosDados } : q))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaAvaliacao = {
      titulo,
      questoes,
      dataCriacao: new Date().toISOString(),
    };

    dispatch(addNewAvaliacao(novaAvaliacao))
      .unwrap()
      .then(() => {
        alert("Avaliação criada com sucesso!");
        navigate("/avaliacao");
      })
      .catch((error) => {
        console.error("Erro ao salvar avaliação:", error);
        alert("Erro ao salvar avaliação. Tente novamente.");
      });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container
        maxWidth="lg"
        className="cabecalho"
        sx={{
          py: 3,
        }}
      >
        <button
          type="button"
          className="botao-voltar"
          aria-label="Voltar"
          onClick={handleVoltar}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Title titulo="Criar Avaliação" className="titulo-pagina" />
      </Container>

      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit} className="autoavaliacao-form">
          <TextField
            fullWidth
            label="Título da Avaliação"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
            required
          />

          <Divider sx={{ mt: 3, mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {questoes.map((questao, index) => (
              <CardQuestao
                key={questao.id}
                questao={questao}
                index={index}
                atualizarQuestao={atualizarQuestao}
                removerQuestao={removerQuestao}
              />
            ))}
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <ButtonCreate
              variant="contained"
              onClick={adicionarQuestao}
              startIcon={<AddCircleIcon />}
              sx={{ p: 1.5 }}
              nameButton="Questão"
            ></ButtonCreate>
          </Box>

          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!titulo || questoes.length === 0}
            >
              Salvar Avaliação
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default CriarAvaliacao;