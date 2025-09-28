import React from "react";
import "./CSS/Metas/metas.css";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";

export default function Metas() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/home")}
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
        <h1>Metas</h1>
      </header>

      <hr className="my-0 mb-4" />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom w-100">
        <div className="container-fluid px-3">
          <Link className="navbar-brand col-lg-3 me-0 fw-semibold" to="/home">
            FeedUp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsGoals"
            aria-controls="navbarsGoals"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse d-lg-flex" id="navbarsGoals">
            <ul className="navbar-nav col-lg-6 justify-content-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/avaliacao/:id">
                  Avaliações
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/metas">
                  Metas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ciclo-revisao">
                  Ciclos de Revisão
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <section className="goals-section">
          <button
            className="goal-card-btn"
            onClick={() => navigate("/meta-detalhe/1")}
          >
            <div className="goal-info">
              <span className="goal-title">Aumentar vendas em 10%</span>
              <span className="goal-desc">Meta para o trimestre atual</span>
            </div>
            <span className="goal-status pendente">Pendente</span>
          </button>

          <button
            className="goal-card-btn"//não sei para onde essa tela deveria levar!
            //onClick={() => navigate("/meta-detalhe/2")}
          >
            <div className="goal-info">
              <span className="goal-title">Reduzir churn em 5%</span>
              <span className="goal-desc">Meta para o semestre</span>
            </div>
            <span className="goal-status aprovado">Aprovado</span>
          </button>

          <button
            className="goal-card-btn" //não sei para onde essa tela deveria levar!
            //onClick={() => navigate("/meta-detalhe/3")}
          >
            <div className="goal-info">
              <span className="goal-title">Implementar novo CRM</span>
              <span className="goal-desc">Meta anual</span>
            </div>
            <span className="goal-status em-analise">Em análise</span>
          </button>
        </section>

        <button className="add-goal-btn" onClick={() => navigate("/criar-meta")}>
          <span className="plus-icon">+</span> Nova Meta
        </button>
      </main>

      {/* Bottom nav */}
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
    </>
  );
}
