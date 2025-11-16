import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Box,
  Stack,
  Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../Components/NavBar"; 

import { updateUserProfile, resetUpdate } from "../../features/user/loginSlice";

export default function EditarPerfil() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isSuccess } = useSelector((state) => state.login);


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState(""); 

  useEffect(() => {
    if (currentUser) {
      const user = currentUser.user || currentUser;
      
      setNome(user.nome || "");
      setEmail(user.email || "");
      setCpf(user.cpf || "");
    }
  }, [currentUser]);
  useEffect(() => {
    if (isSuccess) {
      alert("Perfil atualizado com sucesso!");
      dispatch(resetUpdate()); 
      navigate("/perfil"); 
    }
  }, [isSuccess, navigate, dispatch]);

  const handleVoltar = () => {
    navigate(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const dadosAtualizados = {
      nome,
      email,
      cpf,
    };
    if (senha.trim() !== "") {
      dadosAtualizados.senha = senha;
    }

    dispatch(updateUserProfile(dadosAtualizados));
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar /> 
      
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 2 }}>
            <button
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Voltar"
            onClick={handleVoltar}
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
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#5cc6ba", fontWeight: 'bold' }}>
            Editar Perfil
        </Typography>

        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                backgroundColor: "white", 
                p: 3, 
                borderRadius: 2, 
                boxShadow: 1 
            }}
        >
          <Stack spacing={3}>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="CPF"
              variant="outlined"
              fullWidth
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />

            <TextField
              label="Nova Senha (Opcional)"
              variant="outlined"
              fullWidth
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              helperText="Deixe em branco para manter a senha atual"
            />

            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={isLoading}
                sx={{
                    backgroundColor: "#5cc6ba",
                    "&:hover": { backgroundColor: "#4ab0a5" },
                }}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
} 