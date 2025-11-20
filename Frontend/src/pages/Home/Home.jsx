import React from "react";
import "./homestyle.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import logo from "../../Assets/logo.png";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuNav from "../../Components/MenuNav.jsx";
import NavBar from "../../Components/NavBar.jsx";

/**
 * Página "Home".
 *
 * Renderiza a página inicial principal (provavelmente a landing page ou
 * um dashboard inicial).
 * Exibe um título "Home", a barra de navegação superior (`MenuNav`),
 * a barra de navegação inferior (`NavBar`) e o logo central da aplicação.
 *
 * @returns {JSX.Element} A página Home.
 */
function Home() {
  const theme = useTheme();

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
          Home
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
                justifyContent: "center",
                mt: 4,
                mb: 8,
              }}
            >
              <img className="home-logo" src={logo} alt="Logo FeedUp" />
            </Box>
          </Grid>

          {/* Outros componentes do corpo da página iriam aqui */}
          <Grid item xs={12}>
            {/* Conteúdo da Home */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
