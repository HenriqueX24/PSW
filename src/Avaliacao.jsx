import React from "react";
import "./CSS/Avaliacao/avaliacaostyle.css";

function Avaliacao() {
  const goTo = (url) => { window.location.href = url; };

  return (
    <div className="avaliacao-container">
      <header className="avaliacao-header">
        <a href="#" className="voltar" onClick={e => { e.preventDefault(); goTo("./home.html"); }}>
          {/* Ícone seta para a esquerda */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <h1>Avaliação</h1>
      </header>
      <main className="avaliacao-main">
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
              <a className="navbar-brand col-lg-3 me-0" href="#" onClick={() => goTo("./home.html")}>FeedUp</a>
              <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Avaliações</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => goTo("./metas.html")}>Metas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true" onClick={() => goTo("./ciclo-revisao.html")}>Ciclos de Revisão</a>
                </li>
              </ul>
              <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                <button className="btn btn-primary">Button</button>
              </div>
            </div>
          </div>
        </nav>
        <div className="lista-avaliacoes">
          <div className="avaliacao-item">
            <div className="item-nome">Avaliação 360</div>
            <div className="item-info">
              <span className="item-data">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="4" fill="none" stroke="#5cc6ba" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                18/08/2025
              </span>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeac0NDz1hlTsUdRy33boOPd1rP6zB6VBTmeDx55P5fugkIdg/viewform?usp=header" className="item-link" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M10 13a5 5 0 0 1 7.07 0l1.41 1.41a5 5 0 0 1-7.07 7.07l-1.41-1.41" stroke="#5cc6ba" strokeWidth="2"/>
                  <path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l1.41-1.41" stroke="#5cc6ba" strokeWidth="2"/>
                </svg>
                Link
              </a>
            </div>
          </div>
          <div className="avaliacao-item">
            <div className="item-nome">Avaliação PCH</div>
            <div className="item-info">
              <span className="item-data">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="4" fill="none" stroke="#5cc6ba" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                18/06/2025
              </span>
              <span className="item-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M10 13a5 5 0 0 1 7.07 0l1.41 1.41a5 5 0 0 1-7.07 7.07l-1.41-1.41" stroke="#5cc6ba" strokeWidth="2"/>
                  <path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l1.41-1.41" stroke="#5cc6ba" strokeWidth="2"/>
                </svg>
                Link
              </span>
            </div>
          </div>
          <button className="add-avaliacao-btn" onClick={() => goTo("./criar-avaliacao.html")}>
            <span className="plus-icon">+</span> Nova Avaliação
          </button>
        </div>
      </main>
      <nav className="bottom-nav">
        <div className="nav-icon active" onClick={() => goTo("autoavaliacao.html")}>
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

export default Avaliacao;
