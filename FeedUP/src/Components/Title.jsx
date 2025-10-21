// No seu arquivo Title.jsx

import React from "react";
// Remova a importação do CSS se ele não for mais usado aqui
import { Container, Typography } from "@mui/material";

// Adicione "className" às props
export default function Title({ titulo, className }) { 
  return (
    // Aplique a className recebida ao Typography
    <Typography
      className={className} // <-- A MÁGICA ACONTECE AQUI
      variant="h2"
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