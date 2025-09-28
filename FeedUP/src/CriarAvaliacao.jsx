import React, { useState } from "react";
import "./CSS/CriarAvaliacao/criar-avaliacao.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function CriarAvaliacao() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [link, setLink] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !data || !link.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Avaliação salva com sucesso!");
    navigate("/avaliacao/:id", { replace: true });
  };

  return (
    <div className="avaliacao-container">
      <header className="avaliacao-header">
        <button
          type="button"
          className="voltar"
          aria-label="Voltar"
          onClick={() => navigate("/avaliacao/:id")}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Criar Avaliação</h1>
      </header>

      <main className="avaliacao-main">
        <form className="criar-avaliacao-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              placeholder="Digite o título da avaliação"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="data">Data da Avaliação</label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Link do Formulário</label>
            <input
              type="url"
              id="link"
              placeholder="Cole o link do formulário"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="main-btn">Salvar Avaliação</button>
        </form>
      </main>

      {/* Bottom nav, igual às outras telas */}
      <nav className="bottom-nav">
        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/autoavaliacao") ? "active" : ""}`}
          onClick={() => navigate("/auto-avaliacao/:id")}
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
            <path d="M12 17l4 4 6-8" stroke={isActive("/autoavaliacao") ? "#5cc6ba" : "#bdbdbd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/home") ? "home" : ""}`}
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill={isActive("/home") ? "#5cc6ba" : "#e0e0e0"}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/perfil") ? "active" : ""}`}
          onClick={() => navigate("/perfil")}
          aria-label="Perfil"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill={isActive("/perfil") ? "#5cc6ba" : "#e0e0e0"}>
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
