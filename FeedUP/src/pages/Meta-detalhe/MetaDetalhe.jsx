<<<<<<< HEAD
import React, { useState } from "react";
import "./meta-detalhe.css";
import { useNavigate, useParams } from "react-router-dom";

export default function MetaDetalhe() {
  const [comentario, setComentario] = useState("");
  const [range, setRange] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams(); // /meta-detalhe/:id

=======
import React, { useState, useEffect } from "react";
import "./meta-detalhe.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectMetaById, updateMeta } from "../../features/user/metaSlice";
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
>>>>>>> RefazendoFront
  return (
    <>
      {/* Header */}
      <header className="header">
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/metas")}
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
        <h1>Meta</h1>
      </header>
<<<<<<< HEAD

      {/* Conteúdo */}
      <main>
        <section className="goal-detail">
          {/* Se quiser, use o id na UI */}
          {/* <small className="goal-id">ID: {id}</small> */}

          <h2 className="goal-title">Aumentar vendas em 10%</h2>

          <div className="range">
            <div className="goal-status pendente">Pendente</div>
=======
      <main>
        <section className="goal-detail">
          <h2 className="goal-title">{meta.titulo}</h2>
          <div className="range">
            <div className={`goal-status ${currentStatus.className}`}>
              {currentStatus.label}
            </div>
>>>>>>> RefazendoFront

            <label htmlFor="customRange2" className="form-label" />
            <input
              type="range"
              className="form-range"
              min="0"
<<<<<<< HEAD
              max="5"
=======
              max={STATUS_MAP.length - 1}
>>>>>>> RefazendoFront
              id="customRange2"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </div>
<<<<<<< HEAD

          <div className="goal-desc">
            <strong>Descrição:</strong>
            <p>
              Alcançar um aumento de 10% nas vendas totais do trimestre,
              comparado ao mesmo período do ano anterior.
            </p>
          </div>

          <div className="goal-meta">
            <span>
              <strong>Período:</strong> 01/07/2025 - 30/09/2025
            </span>
            <span>
              <strong>Responsável:</strong> João Silva
=======
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
>>>>>>> RefazendoFront
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
        </section>

<<<<<<< HEAD
        <button
          type="button"
          className="edit-goal-btn"
          // exemplo: ir para edição (ajuste a rota real se existir)
          onClick={() => navigate(`/criar-meta?from=${id ?? ""}`)}
        >
          <span className="edit-icon">&#9998;</span> Editar Meta
        </button>
      </main>

      {/* Bottom nav */}
=======
        <button type="button" className="edit-goal-btn" onClick={handleUpdate}>
          <span className="edit-icon">&#9998;</span> Confirmar Edição
        </button>
      </main>
>>>>>>> RefazendoFront
      <nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")} // use o id real se tiver
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect
              x="6"
              y="6"
              width="20"
              height="20"
              rx="4"
              fill="#fff"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M12 17l4 4 6-8"
              stroke="#bdbdbd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="26"
              cy="8"
              r="4"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M28.5 5.5a4 4 0 0 1 0 5.66"
              stroke="#e0e0e0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          type="button"
<<<<<<< HEAD
          className="nav-icon btn-plain home"
          onClick={() => navigate("/home")}
          aria-label="Home"
=======
          className="nav-icon btn-plain sobre-app"
          onClick={() => navigate("/sobre-app")}
          aria-label="SobreApp"
>>>>>>> RefazendoFront
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#5cc6ba">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-icon btn-plain"
          onClick={() => navigate("/perfil")}
          aria-label="Perfil"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#e0e0e0">
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </button>
      </nav>
    </>
  );
}
