import "./avaliacaostyle.css";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListaCardAvaliacao from "../../Components/ListaCardAvaliacao.jsx";

const NavLinks = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      // Esconde no mobile/tablet e mostra no desktop
      display: { xs: "none", lg: "flex" },
    }}
  >
    {/* Links de Navegação */}
    {[
      { to: "/home", label: "Sobre" },
      { to: "/avaliacao/:id", label: "Avaliações" },
      { to: "/metas", label: "Metas" },
      { to: "/ciclo-revisao", label: "Ciclos de Revisão" },
    ].map((item) => (
      <NavLink
        key={item.to}
        className="nav-link"
        to={item.to}
        style={{ textDecoration: "none", margin: "0 16px" }}
      >
        <Typography
          variant="button"
          sx={{ color: "var(--brand)", fontWeight: 600 }}
        >
          {item.label}
        </Typography>
      </NavLink>
    ))}
  </Box>
);

// Componente para a barra de navegação inferior (Bottom Navigation)
const BottomNav = ({ navigate }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      backgroundColor: "#fff",
      borderTop: "1px solid var(--border)",
      // ALTERAÇÃO: 'display: flex' torna a barra visível em todas as resoluções.
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0",
      zIndex: 100,
    }}
  >
    {/* Botões de Navegação */}
    {[
      {
        path: "/auto-avaliacao/:id",
        label: "Autoavaliação",
        Icon: CheckBoxIcon,
        color: "#e0e0e0",
      },
      { path: "/home", label: "Home", Icon: HomeIcon, color: "var(--brand)" },
      {
        path: "/perfil",
        label: "Perfil",
        Icon: AccountCircleIcon,
        color: "#e0e0e0",
      },
    ].map((item) => (
      <IconButton
        key={item.path}
        onClick={() => navigate(item.path)}
        aria-label={item.label}
        color="default"
      >
        <item.Icon sx={{ color: item.color }} fontSize="large" />
      </IconButton>
    ))}
  </Box>
);

function Avaliacao() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const RouterLink = Link;

  return (
    <div>
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        {/* 1. TÍTULO 'Menu' (Movido para cima da AppBar) */}
        <Container
          maxWidth="lg"
          sx={{
            display: "flex", // Habilita Flexbox
            alignItems: "center", // Centraliza verticalmente
            justifyContent: "flex-start", // Alinha ao início (esquerda)
            gap: 60, // Adiciona um pequeno espaço entre a seta e o título
            py: 3, // Padding vertical
          }}
        >
          <button
            type="button"
            className="voltar"
            aria-label="Voltar"
            onClick={() => navigate("/home")} /* ou navigate(-1) */
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

          {/* Título Avaliações */}
          <Container maxWidth="lg" sx={{ textAlign: "center", py: 3 }}>
            <Typography
              variant="h1"
              sx={{
                lineHeight: 1.2,
                margin: 0,
                color: "var(--brand)",
                fontSize: "2.5rem",
                fontWeight: 300,
                margin: 0 /* remove o hack do margin negativo */,
              }}
            >
              Avaliações
            </Typography>
          </Container>
        </Container>

        {/* NAVBAR REACT */}
        <AppBar position="static" color="default" elevation={1}>
          <Container maxWidth="lg" disableGutters={isMobile}>
            <Toolbar disableGutters>
              {/* Links de Navegação (Desktop) */}
              <NavLinks />

              {/* Logo e Marca */}
              <Link
                component={RouterLink}
                to="/home"
                style={{ textDecoration: "none" }}
              ></Link>

              {/* Ações à Direita e Toggle Button */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => console.log("Abrir Drawer/Menu Mobile")}
                  sx={{ display: { xs: "flex", lg: "none" } }}
                >
                  <MenuIcon sx={{ color: "var(--brand)" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <div className="avaliacao-container">
          {/* LISTA */}
          <AppBar position="static" color="default" elevation={1}>
            <ListaCardAvaliacao />
            <Link className="add-avaliacao-btn" to="/criar-avaliacao">
              <span className="plus-icon">+</span> Nova Avaliação
            </Link>
          </AppBar>
          {/* FIM LISTA */}
        </div>

        {/* 4. Bottom Navigation (Agora visível em todas as resoluções) */}
        <BottomNav navigate={navigate} />
      </Box>
    </div>
  );
}

export default Avaliacao;
