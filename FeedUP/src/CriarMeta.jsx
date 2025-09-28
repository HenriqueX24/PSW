import React, { useState } from "react";
import "./CSS/CriarMeta/criar-meta.css"; // use o C/caixa certo aqui
import { useNavigate } from "react-router-dom";

export default function CriarMeta() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !periodo || !responsavel) {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Meta salva com sucesso!");
    navigate("/metas");
  };

  return (
    <div className="container">
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
        <h1>Criar Meta</h1>
      </header>

      <hr className="divider" />

      <main>
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título da Meta</label>
            <input
              type="text"
              id="titulo"
              placeholder="Ex: Aumentar vendas em 10%"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={3}
              placeholder="Descreva a meta..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <input
              type="text"
              id="periodo"
              placeholder="01/07/2025 - 30/09/2025"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsavel">Responsável</label>
            <input
              type="text"
              id="responsavel"
              placeholder="Nome do responsável"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="main-btn">
            Salvar Meta
          </button>
        </form>
      </main>

      {/* Bottom nav fora do <form> */}
      <nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")}
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
            <path d="M12 17l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="26" cy="8" r="4" fill="none" stroke="#e0e0e0" strokeWidth="2" />
            <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
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
    </div>
  );
}
