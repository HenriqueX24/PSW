import React, { useState } from "react";
import "./meta-detalhe.css";
import { useNavigate, useParams } from "react-router-dom";

export default function MetaDetalhe() {
  const [comentario, setComentario] = useState("");
  const [range, setRange] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams(); // /meta-detalhe/:id

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

      {/* Conteúdo */}
      <main>
        <section className="goal-detail">
          {/* Se quiser, use o id na UI */}
          {/* <small className="goal-id">ID: {id}</small> */}

          <h2 className="goal-title">Aumentar vendas em 10%</h2>

          <div className="range">
            <div className="goal-status pendente">Pendente</div>

            <label htmlFor="customRange2" className="form-label" />
            <input
              type="range"
              className="form-range"
              min="0"
              max="5"
              id="customRange2"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </div>

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
          className="nav-icon btn-plain home"
          onClick={() => navigate("/home")}
          aria-label="Home"
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
