import React from "react";
import "./CSS/Metas/metas.css";

function Metas() {
  const goTo = (url) => { window.location.href = url; };

  return (
    <>
      <header className="header">
        <button className="back-btn" aria-label="Voltar" onClick={() => goTo("./home.html")}>
          <svg width="24" height="24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#7ED6C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>Metas</h1>
      </header>

      <hr className="my-0 mb-4" />
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
            <a className="navbar-brand col-lg-3 me-0" href="#" onClick={() => goTo("./home.html")}>FeedUp</a>
            <ul className="navbar-nav col-lg-6 justify-content-lg-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={() => goTo("./avaliacao.html")}>Avaliações</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Metas</a>
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

      <main>
        <section className="goals-section">
          <button className="goal-card-btn" onClick={() => goTo("./meta-detalhe.html")}>
            <div className="goal-info">
              <span className="goal-title">Aumentar vendas em 10%</span>
              <span className="goal-desc">Meta para o trimestre atual</span>
            </div>
            <span className="goal-status pendente">Pendente</span>
          </button>
          <button className="goal-card-btn">
            <div className="goal-info">
              <span className="goal-title">Reduzir churn em 5%</span>
              <span className="goal-desc">Meta para o semestre</span>
            </div>
            <span className="goal-status aprovado">Aprovado</span>
          </button>
          <button className="goal-card-btn">
            <div className="goal-info">
              <span className="goal-title">Implementar novo CRM</span>
              <span className="goal-desc">Meta anual</span>
            </div>
            <span className="goal-status em-analise">Em análise</span>
          </button>
        </section>
        <button className="add-goal-btn" onClick={() => goTo("./criar-meta.html")}>
          <span className="plus-icon">+</span> Nova Meta
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
        <div className="nav-icon home" onClick={() => goTo("./home.html")}>
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

export default Metas;
