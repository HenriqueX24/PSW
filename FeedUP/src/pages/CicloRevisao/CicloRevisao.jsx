// src/CicloRevisao.jsx
import React from "react";
import "./ciclo-revisao.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";

export default function CicloRevisao() {
  const navigate = useNavigate();

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
        <h1>Ciclo de Revisão</h1>
      </header>

      <hr className="my-0 mb-4" />

      <main className="ciclo-main">
        {/* Navbar superior */}
        <MenuNav />
        {/* Bloco Mensal */}
        <section className="cycle-section">
          <h2 className="cycle-title">
            Mensal <span className="arrow">&#9660;</span>
          </h2>

          <button
            className="review-card-btn"
            onClick={() => navigate("/ciclo-funcionarios/1")}
          >
            <div className="review-info">
              <span className="review-title">Avaliação 360</span>
              <div className="review-meta">
                <span className="icon-calendar">
                  <svg width="20" height="20" fill="none">
                    <rect
                      x="3"
                      y="6"
                      width="14"
                      height="11"
                      rx="3"
                      fill="#7ED6C0"
                    />
                    <path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2" />
                    <rect x="3" y="10" width="14" height="2" fill="#fff" />
                  </svg>
                </span>
                <span className="review-date">Início: 01/08/2025</span>
                <span className="review-date">Término: 31/08/2025</span>
              </div>
            </div>
          </button>
        </section>

        {/* Bloco Anual */}
        <section className="cycle-section">
          <h2 className="cycle-title">
            Anual <span className="arrow">&#9660;</span>
          </h2>

          <button className="review-card-btn" type="button">
            <div className="review-info">
              <span className="review-title">Avaliação PCH</span>
              <div className="review-meta">
                <span className="icon-calendar">
                  <svg width="20" height="20" fill="none">
                    <rect
                      x="3"
                      y="6"
                      width="14"
                      height="11"
                      rx="3"
                      fill="#7ED6C0"
                    />
                    <path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2" />
                    <rect x="3" y="10" width="14" height="2" fill="#fff" />
                  </svg>
                </span>
                <span className="review-date">Início: 01/01/2025</span>
                <span className="review-date">Término: 31/12/2025</span>
              </div>
            </div>
          </button>

          <button
            className="add-avaliacao-btn"
            type="button"
            onClick={() => navigate("/criar-ciclo")}
          >
            <span className="plus-icon">+</span> Criar ciclo
          </button>
        </section>
      </main>

      {/* Bottom nav */}
      <NavBar />
      {/*<nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")}
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect
              x="6"
              y="6"
              width="20"
              height="20"
              rx="4"
              fill="#fff"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M12 17l4 4 6-8"
              stroke="#bdbdbd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="26"
              cy="8"
              r="4"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M28.5 5.5a4 4 0 0 1 0 5.66"
              stroke="#e0e0e0"
              strokeWidth="2"
              strokeLinecap="round"
            />
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
      </nav>*/}
    </>
  );
}
