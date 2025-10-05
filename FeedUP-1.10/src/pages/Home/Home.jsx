import React, { useEffect } from "react"; 
import "./homestyle.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";
import MenuNav from "../../Components/MenuNav.jsx";
import NavBar from "../../Components/NavBar.jsx";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const welcomeMessage = currentUser ? `Bem-vindo(a), ${currentUser.nome}!` : "Home";

   if (!currentUser) {
    return <div>Carregando...</div>;
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* 1. TÍTULO 'Menu' (Movido para cima da AppBar) */}
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 3 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: 300,
            lineHeight: 1.2,
            margin: 0,
            color: "var(--brand)",
          }}
        >
          {/* MUDANÇA: Usa a mensagem dinâmica */}
          {welcomeMessage}
        </Typography>
      </Container>

      <NavBar />

      {/* 2. AppBar Principal (Barra de Navegação) */}
      <MenuNav />

      {/* 3. Conteúdo Principal */}
      <Container
        maxWidth="lg"
        // ALTERAÇÃO: pb: 10 (80px) garante espaço para a barra fixa inferior em todas as resoluções
        sx={{ pt: 4, pb: 10 }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            {/* Logo Central */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
                mb: 8,
              }}
            >
              <img className="home-logo" src={logo} alt="Logo FeedUp" />
              <Typography variant="h6" sx={{ mt: 2, color: '#555' }}>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
