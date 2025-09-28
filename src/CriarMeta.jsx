import React, { useState } from "react";
import "./css/CriarMeta/criar-meta.css";

function CriarMeta() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const goTo = (url) => { window.location.href = url; };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo && descricao && periodo && responsavel) {
      // Aqui você pode salvar a meta ou redirecionar
      alert("Meta salva com sucesso!");
      goTo("./metas.html");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button className="back-btn" aria-label="Voltar" onClick={() => goTo("./metas.html")}>
          <svg width="24" height="24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#7ED6C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              name="titulo"
              placeholder="Ex: Aumentar vendas em 10%"
              required
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              rows="3"
              placeholder="Descreva a meta..."
              required
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <input
              type="text"
              id="periodo"
              name="periodo"
              placeholder="01/07/2025 - 30/09/2025"
              required
              value={periodo}
              onChange={e => setPeriodo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsavel">Responsável</label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              placeholder="Nome do responsável"
              required
              value={responsavel}
              onChange={e => setResponsavel(e.target.value)}
            />
          </div>
          <button type="submit" className="main-btn">Salvar Meta</button>
          <div className="bottom-nav">
            <div className="nav-icon active">
              {/* Novo ícone SVG conforme imagem enviada */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2"/>
                <path d="M12 17l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="26" cy="8" r="4" fill="none" stroke="#e0e0e0" strokeWidth="2"/>
                <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="nav-icon home" onClick={() => goTo("./home.html")}>
              {/* Casa */}
              <svg viewBox="0 0 24 24" fill="#5cc6ba"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            <div className="nav-icon active">
              {/* Usuário */}
              <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CriarMeta;
