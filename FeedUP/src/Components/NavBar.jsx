import { Box, IconButton, Tooltip } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

// Componente para a barra de navegação inferior (Bottom Navigation)
const BottomNav = ({ navigate }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      backgroundColor: "var(--text)",
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
        path: "/registro-atividades",
        label: "Atividades",
        Icon: CheckBoxIcon,
        color: "var(--icon)",
      },
      {
        path: "/ciclo-revisao",
        label: "CicloRevisao",
        Icon: HomeIcon,
        color: "var(--brand)",
      },
      {
        path: "/perfil",
        label: "Perfil",
        Icon: AccountCircleIcon,
        color: "var(--icon)",
      },
    ].map((item) => (
      <Tooltip title={item.label}>
      <IconButton
        key={item.path}
        onClick={() => navigate(item.path)}
        aria-label={item.label}
        color="default"
      >
        <item.Icon sx={{ color: item.color }} fontSize="large" />
      </IconButton>
      </Tooltip>
    ))}
  </Box>
);

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 4. Bottom Navigation (Visível em todas as resoluções) */}
      <BottomNav navigate={navigate} />
    </div>
  );
}

export default NavBar;
