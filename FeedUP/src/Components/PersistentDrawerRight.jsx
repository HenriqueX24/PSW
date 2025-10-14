<<<<<<< HEAD
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom'; // Importar NavLink

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
=======
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
>>>>>>> RefazendoFront
}));

// Links que serão exibidos no menu mobile
const mobileLinks = [
<<<<<<< HEAD
    { to: "/home", label: "Sobre" },
    { to: "/avaliacao/:id", label: "Avaliações" },
    { to: "/metas", label: "Metas" },
    { to: "/ciclo-revisao", label: "Ciclos de Revisão" },
=======
  { to: "/sobre-app", label: "Sobre" },
  { to: "/avaliacao/:id", label: "Avaliações" },
  { to: "/metas", label: "Metas" },
  { to: "/ciclo-revisao", label: "Ciclos de Revisão" },
>>>>>>> RefazendoFront
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
<<<<<<< HEAD
        '& .MuiDrawer-paper': {
=======
        "& .MuiDrawer-paper": {
>>>>>>> RefazendoFront
          width: drawerWidth,
        },
      }}
      // Alterado para 'temporary' que é mais apropriado para menus mobile
<<<<<<< HEAD
      variant="temporary" 
=======
      variant="temporary"
>>>>>>> RefazendoFront
      anchor="right"
      open={open} // Controlado pela prop 'open'
    >
      <DrawerHeader>
<<<<<<< HEAD
        <IconButton onClick={handleDrawerClose}> {/* Controlado pela prop 'handleDrawerClose' */}
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
=======
        <IconButton onClick={handleDrawerClose}>
          {" "}
          {/* Controlado pela prop 'handleDrawerClose' */}
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
>>>>>>> RefazendoFront
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* O List usa o NavLink para navegação e chama handleDrawerClose ao clicar */}
      <List>
        {mobileLinks.map((item) => (
          <ListItem key={item.to} disablePadding>
<<<<<<< HEAD
            <ListItemButton 
                component={NavLink} // Usa NavLink para navegar
                to={item.to}
                onClick={handleDrawerClose} // Fecha o menu após a navegação
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
=======
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
>>>>>>> RefazendoFront
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

<<<<<<< HEAD
export default PersistentDrawerRight;
=======
export default PersistentDrawerRight;
>>>>>>> RefazendoFront
