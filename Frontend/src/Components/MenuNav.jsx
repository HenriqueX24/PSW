import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react"; // 1. Importar useState
import { NavLink } from "react-router-dom";
// 2. Importar o componente Drawer
import HorizontalLinearStepper from "./HorizontalLinearStepper.jsx";

// Componente para agrupar e centralizar os links de navegação do menu principal
const NavLinks = () => (
  <Box
    sx={{
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      // Esconde no mobile/tablet e mostra no desktop
      display: { xs: "none", lg: "flex" },
    }}
  >
    {/* Links de Navegação */}
    {[
      { to: "/ciclo-revisao", label: "Ciclos de Revisão" },
      { to: "/ciclo-funcionarios", label:"Lista de Funcionários"},
      { to: "/avaliacao/:id", label: "Avaliações" },
      { to: "/metas", label: "Metas" },
      { to: "/sobre-app", label: "Sobre" },
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

/**
 * Componente da Barra de Navegação Superior (AppBar).
 *
 * Renderiza a barra principal no topo da página, contendo o
 * componente `HorizontalLinearStepper`.
 * Inclui lógica (agora comentada) para um menu de navegação e
 * detecção de tela (mobile vs. desktop).
 *
 * @returns {JSX.Element} A barra de navegação principal.
 */
export default function MenuNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // 3. Gerenciar o estado do Drawer (menu mobile)
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // Envolver tudo em um Box para melhor gestão de layout
    <Box sx={{ flexGrow: 1 }}>
      {/* 2. AppBar Principal (Barra de Navegação) */}
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg" disableGutters={isMobile}>
          <Toolbar disableGutters>
            <HorizontalLinearStepper />
            {/* Links de Navegação (Desktop) 
            <NavLinks />*/}

            {/* Ações à Direita e Toggle Button */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    </Box>
  );
}
