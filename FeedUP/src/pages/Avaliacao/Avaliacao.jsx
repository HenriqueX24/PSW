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
import Title from "../../Components/Title.jsx";
import ButtonCreate from "../../Components/ButtonCreate.jsx";
import MenuNav from "../../Components/MenuNav.jsx";

const NavLinks = () => (
  <Box
    sx={{
      //display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      // Esconde no mobile/tablet e mostra no desktop
      display: { xs: "none", lg: "flex" },
    }}
  >
    {/* Links de Navegação */}
    {[
      { to: "/sobre-app", label: "Sobre" },
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
      {
        path: "/sobre-app",
        label: "SobreApp",
        Icon: HomeIcon,
        color: "var(--brand)",
      },
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
            onClick={() =>
              navigate(-1)
            } /* ou navigate(-1) */
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

          <Title titulo="Avaliações" />
        </Container>

        {/* NAVBAR REACT */}
        <MenuNav />

        <div className="avaliacao-container">
          {/* LISTA */}
          <AppBar position="static" color="default" elevation={1}>
            <ListaCardAvaliacao />
            <ButtonCreate
              nameButton={"Criar Avaliação"}
              onClick={() => navigate("/criar-autoavaliacao")}
            />
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
