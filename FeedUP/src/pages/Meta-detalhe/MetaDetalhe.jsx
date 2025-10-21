// MetaDetalhe.jsx (Arquivo modificado)

import React, { useState, useEffect } from "react";
import "./meta-detalhe.css";
import { useNavigate, useParams, Link } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { selectMetaById, updateMeta } from "../../features/user/metaSlice";
import { Container, Typography, Box } from "@mui/material"; // Importado Box para melhor layout do histórico
import Title from "../../Components/Title";
import NavBar from "../../Components/NavBar";
import NativeSelectDemo from "../../Components/NativeSelectDemo";

// Corrigido "em-analise" para "Em análise" para melhor exibição
const STATUS_MAP = [
  { label: "Pendente", className: "pendente" },
  { label: "Em análise", className: "em-analise" },
  { label: "Aprovado", className: "aprovado" },
  { label: "Cancelado", className: "cancelado" },
];

// Função auxiliar para formatar a data
const formatarData = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};


export default function MetaDetalhe() {
  const [novoComentario, setNovoComentario] = useState(""); // Renomeado para 'novoComentario'
  const [range, setRange] = useState(0); 
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const meta = useSelector((state) => selectMetaById(state, id));

  useEffect(() => {
    // 1. Verifica se a meta existe
    if (meta) {
      // 2. Se a meta JÁ TIVER um status (ou seja, é uma meta existente)
      if (meta.status) {
        const initialIndex = STATUS_MAP.findIndex(
          (s) => s.label.toLowerCase() === meta.status.toLowerCase()
        );
        if (initialIndex !== -1) {
          setRange(initialIndex);
        }
      } 
      // 3. Se a meta NÃO TIVER um status, define como 'Pendente' (índice 0)
      else {
          const pendenteIndex = STATUS_MAP.findIndex(s => s.label === "Pendente");
          if (pendenteIndex !== -1) {
              setRange(pendenteIndex); 
          }
      }
    }
  }, [meta]); 

  const handleUpdate = async () => {
    const newStatus = STATUS_MAP[range].label;
    
    // Verificações para evitar chamadas desnecessárias.
    // 1. O status mudou?
    const statusChanged = meta.status !== newStatus;
    // 2. Há um novo comentário para adicionar?
    const commentAdded = novoComentario.trim() !== "";
    
    if (!statusChanged && !commentAdded) {
      alert("Nenhuma alteração de status ou novo comentário para salvar.");
      return;
    }

    try {
      // Cria o objeto base de atualização
      const updatedMeta = { ...meta, status: newStatus };
      
      // Lógica para adicionar o novo comentário ao histórico
      if (commentAdded) {
          const novoComentarioObj = {
              texto: novoComentario.trim(),
              data: Date.now(), // Adiciona um timestamp para o histórico
          };

          // Inicializa 'comentarios' como array vazio se não existir
          const comentariosExistentes = meta.comentarios || [];
          
          // Adiciona o novo comentário no array
          updatedMeta.comentarios = [...comentariosExistentes, novoComentarioObj];
      }
      
      // Remove o campo `comentario` que é do `useState` para não poluir
      // o objeto se estivéssemos usando um único estado.
      // Neste caso, estamos usando `novoComentario` e não o incluímos explicitamente.


      await dispatch(updateMeta(updatedMeta)).unwrap();
      
      // Se a atualização foi bem-sucedida, limpamos o campo de comentário.
      if (commentAdded) {
          setNovoComentario(""); // Limpa o campo de texto após o envio
      }
      
      alert("Meta atualizada com sucesso!");
      navigate("/metas"); // Opcional: Se quiser manter na tela de detalhes, remova esta linha
    } catch (err) {
      console.error("Falha ao atualizar a meta:", err);
      alert("Falha ao atualizar a meta.");
    }
  };

  if (!meta) {
    return (
      <section>
        <h2>Meta não encontrada!</h2>
        <Link to="/metas">Voltar para a lista de metas</Link>
      </section>
    );
  }

  const currentStatus = STATUS_MAP[range];
  const comentarios = meta.comentarios || []; // Garante que seja um array para iteração

  return (
    <>
      {/* Header (Manteve-se o mesmo) */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
          py: 3,
        }}
      >
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate(-1)}
          style={{
            marginRight: 0,
            padding: 0,
            minWidth: 32,
            minHeight: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
        <Title titulo={"Metas"} />
      </Container>

      <main>
        <Container className="goal-detail">
          <Typography variant="h5" textAlign="center" className="goal-title">
            {meta.titulo}
          </Typography>
          <div className="range">
            <div className={`goal-status ${currentStatus.className}`}>
              {currentStatus.label}
            </div>
            <NativeSelectDemo
              options={STATUS_MAP}
              value={range}
              onChange={(value) => setRange(Number(value))}
            />
          </div>
          <div className="goal-desc">
            <strong>Descrição:</strong>
            <p>{meta.descricao}</p>
          </div>
          <div className="goal-meta">
            <span>
              <strong>Data de Início:</strong> {meta.inicio || meta.periodo}
            </span>
            <span>
              <strong>Data de Término:</strong> {meta.termino || 'N/A'} 
            </span>
            <span>
              <strong>Responsável:</strong> {meta.responsavel}
            </span>
          </div>

          {/* NOVO: Histórico de Comentários */}
          {comentarios.length > 0 && (
              <Box className="comentario-history" sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" component="strong" sx={{ mb: 1, display: 'block' }}>
                      Histórico de Comentários:
                  </Typography>
                  <Box className="comentario-list" sx={{ maxHeight: '150px', overflowY: 'auto', p: 1, border: '1px solid #ccc', borderRadius: '4px' }}>
                      {comentarios.map((c, index) => (
                          <Box key={index} sx={{ mb: 1, p: 1, backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                              <Typography variant="caption" display="block" color="text.secondary">
                                  {formatarData(c.data)}
                              </Typography>
                              <Typography variant="body2">{c.texto}</Typography>
                          </Box>
                      ))}
                  </Box>
              </Box>
          )}

          {/* Campo para Novo Comentário */}
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label htmlFor="novoComentario">Adicionar Novo Comentário</label>
            <input
              type="text"
              id="novoComentario"
              name="novoComentario"
              placeholder="Digite o seu novo comentário"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
            />
          </div>
        </Container>

        <button type="button" className="edit-goal-btn" onClick={handleUpdate}>
          <span className="edit-icon">&#9998;</span> Confirmar Edição
        </button>
      </main>
      <NavBar />
    </>
  );
}