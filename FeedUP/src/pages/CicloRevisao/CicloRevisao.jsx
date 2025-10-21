// src/CicloRevisao.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCiclos, selectAllCiclos } from "../../features/user/ciclosSlice";
import "./ciclo-revisao.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import CardCiclo from "../../Components/CardCiclo";
import ButtonCreate from "../../Components/ButtonCreate";
import { Grid, Box, Container } from "@mui/material";
import Title from "../../Components/Title";
import SetaVoltar from "../../Components/SetaVoltar";

export default function CicloRevisao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ciclos = useSelector(selectAllCiclos);
  const ciclosStatus = useSelector((state) => state.ciclos.status);
  const { currentUser } = useSelector((state) => state.login);

  useEffect(() => {
    if (ciclosStatus === "idle") {
      dispatch(fetchCiclos());
    }
  }, [ciclosStatus, dispatch]);
  let content;
  if (ciclosStatus === "loading") {
    content = <p>Carregando ciclos...</p>;
  } else if (ciclosStatus === "succeeded") {
    const ciclosAgrupados = ciclos.reduce((acc, ciclo) => {
      const tipo = ciclo.tipo || "Sem Tipo";
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(ciclo);
      return acc;
    }, {});

    content = Object.keys(ciclosAgrupados).map((tipo) => (
      <div key={tipo} className="cycle-section">
        <h2 className="cycle-title">
          {tipo} <span className="arrow">&#9660;</span>
        </h2>
        <Grid container spacing={2}>
          {ciclosAgrupados[tipo].map((ciclo) => (
            <Grid item xs={12} sm={6} md={4} key={ciclo.id}>
              <Link
                to={`/ciclo-funcionarios/${ciclo.id}`}
                className="card-link"
              >
                <CardCiclo ciclo={ciclo} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    ));
  } else if (ciclosStatus === "failed") {
    content = <p>Erro ao carregar ciclos.</p>;
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex", // Habilita Flexbox
          alignItems: "center", // Centraliza verticalmente
          justifyContent: "flex-start", // Alinha ao início (esquerda)
          gap: 60, // Adiciona um pequeno espaço entre a seta e o título
          py: 3, // Padding vertical
        }}
      >
        <SetaVoltar destino='/login'/>
        <Title titulo="Ciclos de Revisão" />
      </Container>

      <MenuNav label={"Ciclo de Revisão"} />
      <main className="ciclo-main">
        {content}
        {currentUser && currentUser.cargo === "gestor" && (
          <ButtonCreate
            nameButton={"Criar Ciclo"}
            onClick={() => navigate("/criar-ciclo")}
          />
        )}
      </main>

      <NavBar />
    </Box>
  );
}
