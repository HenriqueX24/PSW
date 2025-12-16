import React, { useEffect, useState } from "react";
import "./perfilstyle.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/loginSlice";
import { deleteUser } from "../../features/user/usersSlice";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";

/**
 * Página "Meu Perfil".
 *
 * Exibe as informações do usuário atualmente logado (`currentUser`)
 * obtidas do `loginSlice` do Redux.
 * É uma rota protegida; redireciona para /login se não estiver autenticado.
 *
 * Fornece ações para:
 * 1. Voltar (navigate -1).
 * 2. Editar Perfil (navega para /perfil/editar).
 * 3. Sair (Logout) (navega para /login, mas não despacha 'logout' - [NOTA DE REVISÃO]).
 *
 * @returns {JSX.Element} A página de perfil do usuário.
 */
export default function Perfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Efeito de Proteção de Rota
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Navega para a página anterior
  const handleVoltar = () => {
    navigate(-1);
  };
  // Navega para a página de edição
  const handleEdit = () => {
    navigate("/perfil/editar");
  };
  // Funções para o diálogo de exclusão (atualmente comentado)
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Tela de carregamento se 'currentUser' ainda não estiver disponível
  if (!currentUser) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      {/* Cabeçalho com botões Voltar e Editar */}
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
        <IconButton
          onClick={handleEdit}
          aria-label="Editar Perfil"
          style={{ color: "#5cc6ba" }}
        >
          <EditIcon />
        </IconButton>
      </header>
      <hr className="divider" />
      <main className="perfil-main">
        {/* Avatar (placeholder) */}
        <div className="perfil-avatar">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="28" rx="16" ry="16" fill="#C4C4C4" />
            <path
              d="M40 48c-13.255 0-24 6.268-24 14v2h48v-2c0-7.732-10.745-14-24-14z"
              fill="#C4C4C4"
            />
          </svg>
        </div>

        {/* Informações do Usuário (lidas do Redux) */}
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
            <span className="perfil-valor">Marketing</span>{" "}
            {/* (Este pode ser um valor fixo ou vir do usuário no futuro) */}
          </div>
          <div className="perfil-campo">
            <span className="perfil-label">CPF</span>
            <span className="perfil-valor">{currentUser?.cpf}</span>
          </div>

          {/* Exibição do Cargo (Gestor/Funcionário) */}
          <div className="perfil-campo perfil-radio">
            <label>
              <input
                type="radio"
                name="tipo"
                checked={currentUser?.cargo === "funcionario"}
                readOnly
              />
              <span className="radio-custom" />
              Funcionário
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                checked={currentUser?.cargo === "gestor"}
                readOnly
              />
              <span className="radio-custom" />
              Gestor
            </label>
          </div>
          <div></div>
          {/* Botão de Sair (Logout) */}
          <div>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", align: "left" }}
            >
              <Button
                onClick={() => navigate("/login")} // Ação: Navega para /login
                color="error"
                variant="outlined"
              >
                Sair
              </Button>
            </Stack>
          </div>
        </div>
      </main>

      <NavBar />
    </div>
  );
}
