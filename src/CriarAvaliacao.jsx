import React, { useState } from "react";
import "./CSS/CriarAvaliacao/criar-avaliacao.css";

function CriarAvaliacao() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [link, setLink] = useState("");

  const goTo = (url) => { window.location.href = url; };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !data || !link) {
      alert("Preencha todos os campos!");
      return;
    }
    // Aqui você pode salvar a avaliação ou redirecionar
    alert("Avaliação salva com sucesso!");
    goTo("./avaliacao.html");
  };

  return (
    <div className="avaliacao-container">
      <header className="avaliacao-header">
        <a href="#" className="voltar" aria-label="Voltar" onClick={e => { e.preventDefault(); goTo("./avaliacao.html"); }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <h1>Criar Avaliação</h1>
      </header>
      <main className="avaliacao-main">
        <form className="criar-avaliacao-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Digite o título da avaliação"
              required
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data da Avaliação</label>
            <input
              type="date"
              id="data"
              name="data"
              required
              value={data}
              onChange={e => setData(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link do Formulário</label>
            <input
              type="url"
              id="link"
              name="link"
              placeholder="Cole o link do formulário"
              required
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <button type="submit" className="main-btn">Salvar Avaliação</button>
        </form>
      </main>
      <nav className="bottom-nav">
        <div className="nav-icon active">
          {/* Ícone Avaliação */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g opacity="0.5">
              <rect x="4" y="6" width="20" height="20" rx="6" fill="#fff" stroke="#bdbdbd" strokeWidth="2"/>
              <path d="M11 18l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="26" cy="8" r="4" fill="none" stroke="#bdbdbd" strokeWidth="2"/>
              <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        </div>
        <div className="nav-icon home" onClick={() => goTo("./home.html")}>
          {/* Casa */}
          <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
        <div className="nav-icon">
          {/* Usuário */}
          <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
        </div>
      </nav>
    </div>
  );
}

export default CriarAvaliacao;
