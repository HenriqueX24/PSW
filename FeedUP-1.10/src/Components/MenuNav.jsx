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
import PersistentDrawerRight from "./PersistentDrawerRight.jsx";

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
            {/* Links de Navegação (Desktop) */}
            <NavLinks />

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
                onClick={handleDrawerOpen} // 4. Abrir o Drawer ao clicar
                sx={{ display: { xs: "flex", lg: "none" } }}
              >
                <MenuIcon sx={{ color: "var(--brand)" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 5. Colocar o PersistentDrawerRight aqui, fora do AppBar,
             e passar as props para controlá-lo. */}
      <PersistentDrawerRight
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
    </Box>
  );
}
