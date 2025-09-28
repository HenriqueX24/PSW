import React from "react";
import "./CSS/CicloFuncionarios/ciclo-funcionarios.css";

function CicloFuncionarios() {
  const goTo = (url) => { window.location.href = url; };

  return (
    <>
      <header className="header">
        <button className="back-btn" aria-label="Voltar" onClick={() => goTo("./ciclo-revisao.html")}>
          <svg width="24" height="24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#7ED6C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>Funcionários</h1>
      </header>
      <main>
        <section className="employee-list">
          <div className="employee-card">
            <div className="employee-info">
              <span className="employee-name">Ana Souza</span>
              <span className="employee-email">ana.souza@email.com</span>
              <span className="employee-dept">Departamento: Marketing</span>
            </div>
            <div className="employee-actions">
              <span className="status-label realizado">Avaliação realizada</span>
              <button className="ver-avaliacao-btn">Ver Avaliação</button>
            </div>
          </div>
          <div className="employee-card">
            <div className="employee-info">
              <span className="employee-name">Carlos Lima</span>
              <span className="employee-email">carlos.lima@email.com</span>
              <span className="employee-dept">Departamento: RH</span>
            </div>
            <span className="status-label pendente">Avaliação pendente</span>
          </div>
          <div className="employee-card">
            <div className="employee-info">
              <span className="employee-name">Juliana Alves</span>
              <span className="employee-email">juliana.alves@email.com</span>
              <span className="employee-dept">Departamento: TI</span>
            </div>
            <div className="employee-actions">
              <span className="status-label realizado">Avaliação realizada</span>
              <button className="ver-avaliacao-btn">Ver Avaliação</button>
            </div>
          </div>
          <div className="employee-card">
            <div className="employee-info">
              <span className="employee-name">Pedro Martins</span>
              <span className="employee-email">pedro.martins@email.com</span>
              <span className="employee-dept">Departamento: Financeiro</span>
            </div>
            <span className="status-label pendente">Avaliação pendente</span>
          </div>
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

export default CicloFuncionarios;
