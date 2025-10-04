import React from "react";
import { Button, Grid } from "@mui/material";

export default function ButtonCreate({ nameButton, onClick }) {
  return (
    <Grid container justifyContent="center">
      <Button
        onClick={onClick}
        className="add-avaliacao-btn"
        variant="contained"
        sx={{
          mt: 2,
          mb: 4,
          size: "large",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5cc6ba",
          height: "50px",
          borderRadius: "25px",
          textTransform: "none",
          margin: "20px",
        }}
        borderRadius={8}
      >
        <span className="plus-icon">+</span> {nameButton}
      </Button>
    </Grid>
  );
}
