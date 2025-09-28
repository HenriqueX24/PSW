import React, { useState } from "react";
import "./CSS/Meta-detalhe/meta-detalhe.css";

function MetaDetalhe() {
  const [comentario, setComentario] = useState("");
  const [range, setRange] = useState(0);

  const goTo = (url) => { window.location.href = url; };

  return (
    <>
      <header className="header">
        <button className="back-btn" aria-label="Voltar" onClick={() => goTo("../metas.html")}>
          <svg width="24" height="24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#7ED6C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>Meta</h1>
      </header>
      <main>
        <section className="goal-detail">
          <h2 className="goal-title">Aumentar vendas em 10%</h2>
          <div className="range">
            <div className="goal-status pendente">Pendente</div>
            <label htmlFor="customRange2" className="form-label"></label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="5"
              id="customRange2"
              value={range}
              onChange={e => setRange(e.target.value)}
            />
          </div>
          <div className="goal-desc">
            <strong>Descrição:</strong>
            <p>Alcançar um aumento de 10% nas vendas totais do trimestre, comparado ao mesmo período do ano anterior.</p>
          </div>
          <div className="goal-meta">
            <span><strong>Período:</strong> 01/07/2025 - 30/09/2025</span>
            <span><strong>Responsável:</strong> João Silva</span>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <input
                type="text"
                id="comentario"
                name="comentario"
                placeholder="Digite o seu comentario"
                required
                value={comentario}
                onChange={e => setComentario(e.target.value)}
              />
            </div>
          </div>
        </section>
        <button className="edit-goal-btn">
          <span className="edit-icon">&#9998;</span> Editar Meta
        </button>
      </main>
      <nav className="bottom-nav">
        <div className="nav-icon active">
          {/* Novo ícone SVG conforme imagem enviada */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2"/>
            <path d="M12 17l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="26" cy="8" r="4" fill="none" stroke="#e0e0e0" strokeWidth="2"/>
            <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="nav-icon home" onClick={() => goTo("../home.html")}>
          {/* Casa */}
          <svg viewBox="0 0 24 24" fill="#5cc6ba"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
        <div className="nav-icon active">
          {/* Usuário */}
          <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
        </div>
      </nav>
    </>
  );
}

export default MetaDetalhe;
