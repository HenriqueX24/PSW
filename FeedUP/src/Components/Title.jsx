import React from "react";
import "../pages/Avaliacao/avaliacaostyle.css";
import { Container, Typography } from "@mui/material";

export default function Title({ titulo }) {
  return (
    <Typography
      variant="h1"
      sx={{
        lineHeight: 1.2,
        color: "var(--brand)",
        fontSize: "2.5rem",
        fontWeight: 300,
        margin: 0 /* remove o hack do margin negativo */,
      }}
    >
      {titulo}
    </Typography>
  );
}
