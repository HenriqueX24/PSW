import React from "react";
import "../pages/Avaliacao/avaliacaostyle.css";
import { Container, Typography } from "@mui/material";

export default function Title({ titulo }) {
  return (
    <Typography
      // Você pode manter o variant como h2 por semântica, mas o estilo é controlado pelo sx
      variant="h2" 
      sx={{
        lineHeight: 1.2,
        color: "var(--brand)",
        fontWeight: 300,
        margin: 0,
        // Garante que o texto quebre a linha se for muito longo
        whiteSpace: 'normal', 
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        // Aplicação da responsividade no fontSize
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