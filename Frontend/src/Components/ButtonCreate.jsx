import React from "react";
import { Button, Grid } from "@mui/material";

/**
 * Botão de criação genérico e estilizado (Material-UI).
 * Exibe um ícone "+" e um texto customizável.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.nameButton - O texto a ser exibido no botão (ex: "Criar Meta").
 * @param {function} props.onClick - A função a ser executada ao clicar no botão.
 * @returns {JSX.Element} O componente do botão.
 */
export default function ButtonCreate({ nameButton, onClick }) {
  return (
    <Grid container justifyContent="center">
      <Button
        onClick={onClick}
        className="add-avaliacao-btn"
        variant="contained"
        // 'sx' é a prop do Material-UI para estilização customizada
        sx={{
          mt: 2, // margin-top
          mb: 4, // margin-bottom
          size: "large",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5cc6ba",
          height: "50px",
          borderRadius: "25px",
          textTransform: "none", // Impede que o texto fique em MAIÚSCULAS
          margin: "20px",
        }}
        borderRadius={8}
      >
        <span className="plus-icon">+</span> {nameButton}
      </Button>
    </Grid>
  );
}
