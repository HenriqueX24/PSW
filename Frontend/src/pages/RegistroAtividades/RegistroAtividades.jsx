import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Paper, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// Importa thunks e os novos seletores
import {
  fetchMetas,
  selectMetasConcluidas, // Seletor para metas concluídas
} from "../../features/user/metaSlice";
import {
  fetchAvaliacoes,
  selectAvaliacoesRespondidas, // Seletor para avaliações respondidas
} from "../../features/user/avaliacaoSlice";

import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import AvaliacaoSnapshotModal from "../../Components/AvaliacaoSnapshotModal"; // Modal para ver snapshot

/**
 * Componente de Card interno para o Histórico.
 * @param {object} props - Propriedades.
 * @param {string} props.titulo - Título do item.
 * @param {string} props.tipo - "Meta" ou "Avaliação".
 * @param {function} props.onClick - Função de clique.
 * @returns {JSX.Element}
 */
// Componente simples para representar um Card de Histórico
const HistoricoCard = ({ titulo, tipo, onClick }) => (
  <Grid xs={12} sm={6} md={4}>
    <Paper
      sx={{
        p: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <Typography variant="h6">{titulo}</Typography>
      <Typography variant="caption" color="text.secondary">
        {tipo} Concluída
      </Typography>
    </Paper>
  </Grid>
);

/**
 * Página "Registro de Atividades" (Histórico).
 *
 * Exibe um histórico combinado de *atividades concluídas*.
 * Busca dados de dois slices diferentes do Redux: `metaSlice` e `avaliacaoSlice`.
 * Usa seletores customizados (`selectMetasConcluidas`, `selectAvaliacoesRespondidas`)
 * para obter apenas os itens finalizados.
 *
 * Combina os dois arrays, ordena por data (mais recente primeiro) e exibe.
 * Clicar em uma "Avaliação" abre o modal `AvaliacaoSnapshotModal` para
 * exibir as respostas.
 *
 * @returns {JSX.Element} A página de histórico.
 */
// Função auxiliar para formatar e exibir o snapshot da avaliação
const showAvaliacaoSnapshot = (avaliacao) => {
  if (!avaliacao.respostas) {
    return alert(
      `Avaliação "${avaliacao.titulo}" concluída, mas sem respostas salvas.`
    );
  }
{/*
  // Constrói a string de exibição do snapshot
  let snapshotText = `Avaliação: ${avaliacao.titulo}\nStatus: ${
    avaliacao.status
  }\nRespondida em: ${new Date(
    avaliacao.dataResposta
  ).toLocaleString()}\n\n--- Respostas ---\n`;

  // Itera sobre as questões e exibe a resposta salva
  avaliacao.questoes.forEach((questao, index) => {
    const idQuestao = String(questao.id);
    const resposta = avaliacao.respostas[idQuestao];

    snapshotText += `${index + 1}. ${questao.enunciado}:\n   > ${
      resposta || "Sem Resposta Salva"
    }\n\n`;
  });

  alert(snapshotText); // Usa alert para a demonstração
};
 */}}
export default function RegistroAtividades() {
  const dispatch = useDispatch();

  // 1. Estados para o Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState(null);

  // Funções de controle do Modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAvaliacao(null); // Limpa os dados do item
  };

  // Efeito para buscar os dados ao carregar o componente
  useEffect(() => {
    dispatch(fetchMetas());
    dispatch(fetchAvaliacoes());
  }, [dispatch]);

  // Selecionando os dados filtrados 
  const metasConcluidas = useSelector(selectMetasConcluidas);
  const avaliacoesRespondidas = useSelector(selectAvaliacoesRespondidas);

  // Combina metas e avaliações e ordena cronologicamente
  const historicoCombinado = [
    // Mapeia metas concluídas
    ...metasConcluidas.map((meta) => ({
      id: `meta-${meta.id}`,
      titulo: meta.titulo,
      tipo: "Meta",
      // Assumindo que você tem um campo de data de conclusão para ordenação
      data: meta.dataConclusao || new Date().getTime(),
      dados: meta, // Guarda o snapshot final
    })),
    // Mapeia avaliações respondidas
    ...avaliacoesRespondidas.map((avaliacao) => ({
      id: `avaliacao-${avaliacao.id}`,
      titulo: avaliacao.titulo,
      tipo: "Avaliação",
      // Assumindo que você tem um campo de data de resposta para ordenação
      data: avaliacao.dataResposta || new Date().getTime(),
      dados: avaliacao, // Guarda o snapshot da avaliação com as respostas
    })),
  ].sort((a, b) => b.data - a.data); // Ordena do mais recente para o mais antigo

  // Handler para o clique no card (abre Modal ou Alert)
  const handleCardClick = (item) => {
    // Lógica para mostrar o snapshot (modal, navegação, etc.)
    if (item.tipo === "Meta") {
      alert(
        `Visualizar Snapshot Final da Meta: ${item.titulo}\nStatus: ${
          item.dados.status
        }\nComentários: ${
          item.dados.comentarios ? item.dados.comentarios.length : 0
        }`
      );
      // Implemente aqui a abertura de um Modal com o "snapshot final da meta" (item.dados)
    } else if (item.tipo === "Avaliação") {
      // Abre o Modal com os dados da avaliação
      setSelectedAvaliacao(item);
      setModalOpen(true);
    }
  };

  // Renderização condicional do conteúdo
  const content =
    historicoCombinado.length > 0 ? (
      <Grid container spacing={3}>
        {historicoCombinado.map((item) => (
          <HistoricoCard
            key={item.id}
            titulo={item.titulo}
            tipo={item.tipo}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </Grid>
    ) : (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Nenhum registro de atividades concluídas encontrado.
      </Typography>
    );

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <Title titulo="Registro de Atividades - Histórico" />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Histórico de Avaliações Feitas
          </Typography>
          {content}
        </Box>
      </Container>
      <NavBar />

      {/* O Modal de Snapshot (controlado por state) */}
      <AvaliacaoSnapshotModal 
        open={modalOpen} 
        handleClose={handleModalClose} 
        avaliacao={selectedAvaliacao} 
      />
    </>
  );
}
