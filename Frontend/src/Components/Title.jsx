import React from "react";
import "../pages/Avaliacao/avaliacaostyle.css";
import { Container, Typography } from "@mui/material";

/**
 * Componente de Título reutilizável.
 *
 * Renderiza um `Typography` do Material-UI com estilos responsivos
 * (fonte muda de tamanho com `xs`, `sm`, `md`) e cor da marca.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.titulo - O texto a ser exibido no título.
 * @param {string} [props.className] - Classe CSS opcional para estilização adicional.
 * @returns {JSX.Element} O componente de título.
 */
export default function Title({ titulo, className }) {
  return (
    <Typography
      variant="h2" 
      className={className}
      sx={{
        lineHeight: 1.2,
        color: "var(--brand)",
        fontWeight: 300,
        margin: 0,
        whiteSpace: 'normal', 
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        fontSize: {
          xs: "1.5rem", 
          sm: "2rem",    
          md: "2.5rem",
        },
      }}
    >
      {titulo}
    </Typography>
  );
}
