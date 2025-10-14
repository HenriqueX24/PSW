import React, { useState } from "react";
import "./criar-avaliacao.css";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar.jsx";

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
            <path
              d="M15 18l-6-6 6-6"
              stroke="#5cc6ba"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

          <button type="submit" className="main-btn">
            Salvar Avaliação
          </button>
        </form>
      </main>
      <NavBar />
    </div>
  );
}
