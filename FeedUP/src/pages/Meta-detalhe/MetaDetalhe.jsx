import React, { useState, useEffect } from "react";
import "./meta-detalhe.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMetaById, updateMeta } from "../../features/user/metaSlice";
import { Container, Box, Grid, Typography } from "@mui/material";
import Title from "../../Components/Title";
import NavBar from "../../Components/NavBar";

const STATUS_MAP = [
  { label: "Pendente", className: "pendente" },
  { label: "aprovado", className: "aprovado" },
  { label: "em-analise", className: "em-analise" },
  { label: "Cancelado", className: "cancelado" },
];

export default function MetaDetalhe() {
  const [comentario, setComentario] = useState("");
  const [range, setRange] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const meta = useSelector((state) => selectMetaById(state, id));

  useEffect(() => {
    if (meta && meta.status) {
      const initialIndex = STATUS_MAP.findIndex(
        (s) => s.label.toLowerCase() === meta.status.toLowerCase()
      );
      if (initialIndex !== -1) {
        setRange(initialIndex);
      }
    }
  }, [meta]);
  const handleUpdate = async () => {
    // Pega o status atual selecionado no slider
    const newStatus = STATUS_MAP[range].label;

    // Verifica se o status realmente mudou para evitar requisições desnecessárias
    if (meta.status === newStatus) {
      alert("Nenhuma alteração para salvar.");
      return;
    }

    try {
      // Cria uma cópia da meta original, mas com o novo status
      const updatedMeta = { ...meta, status: newStatus };

      // Despacha a ação 'updateMeta' para o Redux e espera a conclusão
      await dispatch(updateMeta(updatedMeta)).unwrap();

      alert("Meta atualizada com sucesso!");
      navigate("/metas"); // Navega de volta para a lista de metas
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
  return (
    <>
      {/* Header */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20, // Gap reduzido para aproximar a seta do título
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

            <label htmlFor="customRange2" className="form-label" />
            <input
              type="range"
              className="form-range"
              min="0"
              max={STATUS_MAP.length - 1}
              id="customRange2"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </div>
          <div className="goal-desc">
            <strong>Descrição:</strong>
            <p>{meta.descricao}</p>
          </div>
          <div className="goal-meta">
            <span>
              <strong>Período:</strong> {meta.periodo}
            </span>
            <span>
              <strong>Responsável:</strong> {meta.responsavel}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="comentario">Comentário</label>
            <input
              type="text"
              id="comentario"
              name="comentario"
              placeholder="Digite o seu comentário"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
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
