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
import './CriarAvaliacao.css'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardQuestao from "../../Components/CardQuestao"; 
import ButtonCreate from "../../Components/ButtonCreate";
import NavBar from "../../Components/NavBar";
import { useDispatch } from 'react-redux'; // NOVO: Importação do useDispatch
import { addNewAvaliacao } from "../../features/user/avaliacaoSlice"; // NOVO: Importação da ação Redux

function CriarAvaliacao() {
  const dispatch = useDispatch(); // NOVO: Hook para despachar ações
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [questoes, setQuestoes] = useState([]);

  // Função para adicionar uma nova questão
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

  // Função para remover uma questão
  const removerQuestao = (id) => {
    setQuestoes(questoes.filter((q) => q.id !== id));
  };

  // Função para atualizar os dados de uma questão específica
  const atualizarQuestao = (id, novosDados) => {
    setQuestoes(
      questoes.map((q) => (q.id === id ? { ...q, ...novosDados } : q))
    );
  };

  // Função de submissão do formulário (agora salva via Redux)
  const handleSubmit = (event) => {
    event.preventDefault();

    const novaAvaliacao = {
      titulo,
      questoes,
      // Adiciona uma data de criação para mock no Card (opcional)
      dataCriacao: new Date().toISOString(), 
    };

    // NOVO: Despacha a ação assíncrona para salvar a avaliação
    dispatch(addNewAvaliacao(novaAvaliacao))
      .unwrap() // Lida com a promise do thunk
      .then(() => {
        alert("Avaliação criada com sucesso!");
        navigate("/avaliacao"); // Volta para a Lista de Avaliações
      })
      .catch((error) => {
        console.error("Erro ao salvar avaliação:", error);
        alert("Erro ao salvar avaliação. Tente novamente.");
      });
  };

  const handleVoltar = () => {
    navigate(-1);
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <button
          type="button"
          className="voltar"
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

        <Typography variant="h4" component="h1" gutterBottom>
          Criar Avaliação
        </Typography>

        <form onSubmit={handleSubmit} className="autoavaliacao-form">
          {/* Campo para o Título da Avaliação */}
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

          {/* Lista de Questões */}
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

          {/* Botão Adicionar Questão */}
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
    </>
  );
}

export default CriarAvaliacao;