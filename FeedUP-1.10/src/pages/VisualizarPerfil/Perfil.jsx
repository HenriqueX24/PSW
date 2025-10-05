import React, { useEffect } from "react";
import "./perfilstyle.css";
import { useNavigate, NavLink, useLocation, Link } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import { Container, IconButton } from "@mui/material";

export default function Perfil() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
    useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    // NOVO: Adiciona um retorno antecipado (ex: um loader) se o currentUser for null
  // (Note: O useEffect ainda será executado para o redirecionamento)
  if (!currentUser) {
    // Você pode retornar um spinner ou null, dependendo de como você gerencia o carregamento
    return <div>Carregando perfil...</div>; 
  }
  }, [isAuthenticated, navigate]);
  const handleVoltar = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  const isActive = (path) => pathname === path;

  return (
    <div className="perfil-container">
      <header className="perfil-header">
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
            <span className="perfil-valor">{currentUser?.nome}</span>
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">E-mail</span>
            <span className="perfil-valor">{currentUser?.email}</span>
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">Departamento</span>
            <span className="perfil-valor">Marketing</span> {/* (Este pode ser um valor fixo ou vir do usuário no futuro) */}
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">CPF</span>
            <span className="perfil-valor">{currentUser?.cpf}</span>
          </div>

          <div className="perfil-campo perfil-radio">
            <label>
              <input 
              type="radio" 
              name="tipo" 
              checked={currentUser?.cargo === 'funcionario'}/>
              <span className="radio-custom" />
              Funcionário
            </label>
            <label>
              <input 
              type="radio" 
              name="tipo"
              checked={currentUser?.cargo === 'gestor'}/>
              <span className="radio-custom" />
              Gestor
            </label>
          </div>
          <div>
          <IconButton >
            <EditIcon direction="row" spacing={1} display="flex" align="left"/>
          </IconButton>
            </div>
            
            <Button flex-wrap="row" color="error">Encerrar Conta</Button>
        </div>
      </main>

      {/* Bottom Nav (SPA) */}
      <NavBar />
      
    </div>
  );
}
