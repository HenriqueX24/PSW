import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// ListItemIcon não é mais necessário, então pode ser removido
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom"; // Importar NavLink

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

// Links que serão exibidos no menu mobile
const mobileLinks = [
  { to: "/sobre-app", label: "Sobre" },
  { to: "/avaliacao/:id", label: "Avaliações" },
  { to: "/metas", label: "Metas" },
  { to: "/ciclo-revisao", label: "Ciclos de Revisão" },
];

// O componente agora recebe as props do pai
function PersistentDrawerRight({ open, handleDrawerClose }) {
  const theme = useTheme();

  return (
    // Removendo Box, CssBaseline, AppBar e Main
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      // Alterado para 'temporary' que é mais apropriado para menus mobile
      variant="temporary"
      anchor="right"
      open={open} // Controlado pela prop 'open'
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {" "}
          {/* Controlado pela prop 'handleDrawerClose' */}
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* O List usa o NavLink para navegação e chama handleDrawerClose ao clicar */}
      <List>
        {mobileLinks.map((item) => (
          <ListItem key={item.to} disablePadding>
            {/* INÍCIO DA CORREÇÃO */}
            <ListItemButton
              component={NavLink} // Usa NavLink para navegar
              to={item.to}
              onClick={handleDrawerClose} // Fecha o menu após a navegação
            >
              {/* O ListItemIcon foi removido daqui */}
              <ListItemText primary={item.label} />
            </ListItemButton>
            {/* FIM DA CORREÇÃO */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default PersistentDrawerRight;
