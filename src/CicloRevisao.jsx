import React from "react";
import "./CSS/CicloRevisao/ciclo-revisao.css";

function CicloRevisao() {
  const goTo = (url) => { window.location.href = url; };

  return (
    <>
      <header className="header">
        <button className="back-btn" aria-label="Voltar" onClick={() => goTo("./home.html")}>
          <svg width="24" height="24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#7ED6C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>Ciclo de Revisão</h1>
      </header>
      <main className="ciclo-main">
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

        <section className="cycle-section">
          <h2 className="cycle-title">Mensal <span className="arrow">&#9660;</span></h2>
          <button className="review-card-btn" onClick={() => goTo("./ciclo-funcionarios.html")}>
            <div className="review-info">
              <span className="review-title">Avaliação 360</span>
              <div className="review-meta">
                <span className="icon-calendar">
                  <svg width="20" height="20" fill="none"><rect x="3" y="6" width="14" height="11" rx="3" fill="#7ED6C0"/><path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2"/><rect x="3" y="10" width="14" height="2" fill="#fff"/></svg>
                </span>
                <span className="review-date">Início: 01/08/2025</span>
                <span className="review-date">Término: 31/08/2025</span>
              </div>
            </div>
          </button>
        </section>
        <section className="cycle-section">
          <h2 className="cycle-title">Anual <span className="arrow">&#9660;</span></h2>
          <button className="review-card-btn">
            <div className="review-info">
              <span className="review-title">Avaliação PCH</span>
              <div className="review-meta">
                <span className="icon-calendar">
                  <svg width="20" height="20" fill="none"><rect x="3" y="6" width="14" height="11" rx="3" fill="#7ED6C0"/><path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2"/><rect x="3" y="10" width="14" height="2" fill="#fff"/></svg>
                </span>
                <span className="review-date">Início: 01/01/2025</span>
                <span className="review-date">Término: 31/12/2025</span>
              </div>
            </div>
          </button>
          <button className="add-avaliacao-btn" onClick={() => goTo("./criar-ciclo.html")}>
            <span className="plus-icon">+</span> Criar ciclo
          </button>
        </section>
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
        <div className="nav-icon home" onClick={() => goTo("home.html")}>
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

export default CicloRevisao;
