import React from "react";
import "./perfilstyle.css";
import { useNavigate, NavLink, useLocation, Link } from "react-router-dom";
import NavBar from '../../Components/NavBar'

export default function Perfil() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleVoltar = (e) => {
    e.preventDefault();
    // volte uma página OU vá direto para /home
    // navigate(-1);
    navigate("/home");
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        {/* Use button/Link para não recarregar a página */}
        <button
          type="button"
          className="voltar"
          onClick={handleVoltar}
          aria-label="Voltar"
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
        <h1>Meu Perfil</h1>
      </header>

      <hr className="divider" />

      <main className="perfil-main">
        <div className="perfil-avatar">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="28" rx="16" ry="16" fill="#C4C4C4" />
            <path
              d="M40 48c-13.255 0-24 6.268-24 14v2h48v-2c0-7.732-10.745-14-24-14z"
              fill="#C4C4C4"
            />
          </svg>
        </div>

        <div className="perfil-info">
          <div className="perfil-campo">
            <span className="perfil-label">Nome</span>
            <span className="perfil-valor">Heber Stein Mazutti</span>
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">E-mail</span>
            <span className="perfil-valor">heber@empresa.com.br</span>
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">Departamento</span>
            <span className="perfil-valor">Marketing</span>
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">CPF</span>
            <span className="perfil-valor">123456789-01</span>
          </div>

          <div className="perfil-campo perfil-radio">
            <label>
              <input type="radio" name="tipo" />
              <span className="radio-custom" />
              Funcionário
            </label>
            <label>
              <input type="radio" name="tipo" defaultChecked />
              <span className="radio-custom" />
              Gestor
            </label>
          </div>
        </div>
      </main>

      {/* Bottom Nav (SPA) */}
      <NavBar />
      
    </div>
  );
}
