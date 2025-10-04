// src/CicloRevisao.jsx
import React from "react";
import "./ciclo-revisao.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Grid } from "@mui/material";
import CardCiclo from "../../Components/CardCiclo";
import ButtonCreate from "../../Components/ButtonCreate";

export default function CicloRevisao() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/home")}
        >
          <svg width="24" height="24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#7ED6C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>Ciclo de Revisão</h1>
      </header>

      <Grid className="ciclo-main">
        <Grid size={12} item>
          <MenuNav /> {/* Navbar superior */}
        </Grid>

        {/* Bloco Mensal */}
        <Grid
          container
          spacing={0}
          className="cycle-section"
          minHeight={160}
          size={20}
          margin={0}
          display={"flex"}
          flexDirection={"nowrap"}
        >
          <Grid size={12} item>
            <h2 className="cycle-title">
              {" "}
              {/* Transformar em componente label */}
              Mensal <span className="arrow">&#9660;</span>
            </h2>
          </Grid>
          <CardCiclo />
        </Grid>

        {/* Bloco Anual */}
        <Grid container spacing={1} className="cycle-section" margin={0}>
          <Grid
            container
            className="cycle-subsection"
            spacing={0}
            minHeight={160}
            size={20}
          >
            <Grid size={12}>
              <h2 className="cycle-title">
                Anual <span className="arrow">&#9660;</span>
              </h2>
            </Grid>
            {/*componente funcional CardCiclo*/}
            <Grid size={3}>
              <button className="review-card-btn" type="button">
                <div className="review-info">
                  <span className="review-title">Avaliação PCH</span>
                  <div className="review-meta">
                    <span className="icon-calendar">
                      <svg width="20" height="20" fill="none">
                        <rect
                          x="3"
                          y="6"
                          width="14"
                          height="11"
                          rx="3"
                          fill="#7ED6C0"
                        />
                        <path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2" />
                        <rect x="3" y="10" width="14" height="2" fill="#fff" />
                      </svg>
                    </span>
                    <span className="review-date">Início: 01/01/2025</span>
                    <span className="review-date">Término: 31/12/2025</span>
                  </div>
                </div>
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Botão criar ciclo */}
      <ButtonCreate nameButton="Novo Ciclo" />
      {/*<Grid container justifyContent="center">
        <Button
          onClick={() => navigate("/criar-ciclo")}
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
          <span className="plus-icon">+</span> Criar ciclo
        </Button>
      </Grid>
      */}
      {/* Bottom nav */}
      <NavBar />
    </>
  );
}
