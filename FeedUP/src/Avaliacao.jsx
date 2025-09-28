import React from "react";
import "./CSS/Avaliacao/avaliacaostyle.css";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";

export default function Avaliacao() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  return (
    <div className="avaliacao-container">
      <header className="avaliacao-header">
        <button
          type="button"
          className="voltar"
          aria-label="Voltar"
          onClick={() => navigate("/home")} /* ou navigate(-1) */
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>Avaliação</h1>
      </header>

      <main className="avaliacao-main">
        {/* NAVBAR REACT */}
        <nav className="navbar navbar-expand-lg bg-white border-bottom w-100">
          <div className="container-fluid px-3">
            <Link className="navbar-brand fw-semibold" to="/home">FeedUp</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsMain"
                    aria-controls="navbarsMain" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarsMain">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/avaliacao/:id">Avaliações</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/metas">Metas</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ciclo-revisao">Ciclos de Revisão</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* LISTA */}
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
              {/* link externo mantém <a> */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeac0NDz1hlTsUdRy33boOPd1rP6zB6VBTmeDx55P5fugkIdg/viewform?usp=header"
                className="item-link"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <span className="item-link disabled">Link</span>
            </div>
          </div>

          <Link className="add-avaliacao-btn" to="/criar-avaliacao">
            <span className="plus-icon">+</span> Nova Avaliação
          </Link>
        </div>
      </main>

      {/* BOTTOM NAV SPA */}
      <nav className="bottom-nav">
        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/autoavaliacao") ? "active" : ""}`}
          onClick={() => navigate("/auto-avaliacao/:id")}
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2"/>
            <path d="M12 17l4 4 6-8" stroke={isActive("/autoavaliacao") ? "#5cc6ba" : "#bdbdbd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/home") ? "home" : ""}`}
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill={isActive("/home") ? "#5cc6ba" : "#e0e0e0"}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>

        <button
          type="button"
          className={`nav-icon btn-plain ${isActive("/perfil") ? "active" : ""}`}
          onClick={() => navigate("/perfil")}
          aria-label="Perfil"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill={isActive("/perfil") ? "#5cc6ba" : "#e0e0e0"}>
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          </svg>
        </button>
      </nav>
    </div>
  );
}
