import React, { useEffect, useState } from "react";
import "./perfilstyle.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/loginSlice";
import { deleteUser } from "../../features/user/usersSlice";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";

export default function Perfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const user = currentUser?.user || currentUser;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleVoltar = () => {
    navigate(-1);
  };
  const handleEdit = () => {
    navigate("/perfil/editar");
  };
  if (!user) {
    return <div style={{padding: 20, textAlign: 'center'}}>Carregando dados do perfil...</div>;
  }

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
        <IconButton
          onClick={handleEdit}
          aria-label="Editar Perfil"
          style={{ color: "#5cc6ba" }}
        >
          <EditIcon />
        </IconButton>
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
          {/* NOME */}
          <div className="perfil-campo">
            <span className="perfil-label">Nome</span>
            <span className="perfil-valor">{user.nome || "Não informado"}</span>
          </div>

          {/* EMAIL */}
          <div className="perfil-campo">
            <span className="perfil-label">E-mail</span>
            <span className="perfil-valor">{user.email || "Não informado"}</span>
          </div>

          {/* DEPARTAMENTO */}
          <div className="perfil-campo">
            <span className="perfil-label">Departamento</span>
            <span className="perfil-valor">Marketing (Padrão)</span> 
          </div>

          {/* CPF */}
          <div className="perfil-campo">
            <span className="perfil-label">CPF</span>
            <span className="perfil-valor">{user.cpf || "Não informado"}</span>
          </div>

          {/* CARGO (Radio Buttons Visuais) */}
          <div className="perfil-campo perfil-radio">
            <label style={{pointerEvents: 'none'}}> {/* Bloqueado para clique */}
              <input
                type="radio"
                name="tipo"
                checked={user.cargo === "funcionario"}
                readOnly
              />
              <span className="radio-custom" />
              Funcionário
            </label>
            <label style={{pointerEvents: 'none'}}> {/* Bloqueado para clique */}
              <input
                type="radio"
                name="tipo"
                checked={user.cargo === "gestor"}
                readOnly
              />
              <span className="radio-custom" />
              Gestor
            </label>
          </div>

          <div>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", align: "left", marginTop: 2 }}
            >
              <Button
                onClick={() => dispatch(logout())}
                color="error"
                variant="outlined"
              >
                Sair da Conta
              </Button>
            </Stack>
          </div>
        </div>
      </main>

      <NavBar />
    </div>
  );
}