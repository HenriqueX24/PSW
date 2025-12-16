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
import { createEntityAdapter } from "@reduxjs/toolkit";

/**
 * Página "Ciclo de Revisão".
 *
 * Página principal que exibe todos os Ciclos de Revisão.
 * Busca os ciclos (`fetchCiclos`) do Redux na montagem.
 * Agrupa os ciclos por 'tipo' (ex: Mensal, Semestral) e os exibe
 * em seções, cada um como um `CardCiclo` clicável que leva
 * para a página `/ciclo-funcionarios/:id`.
 *
 * Renderiza condicionalmente o botão "Criar Ciclo" se o usuário
 * logado for um "gestor".
 *
 * @returns {JSX.Element} A página de listagem de ciclos de revisão.
 */
export default function CicloRevisao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ciclos = useSelector(selectAllCiclos); // Busca todos os ciclos
  const ciclosStatus = useSelector((state) => state.ciclos.status); // Busca o status (idle, loading, etc.)
  const reduxUser = useSelector((state) => state.login.currentUser);
  const currentUser =
    reduxUser || JSON.parse(localStorage.getItem("currentUser"));

  // Efeito para buscar os ciclos do Redux (da "API")
  useEffect(() => {
    // Se o status for 'idle' (ocioso), busca os ciclos
    if (ciclosStatus === "idle") {
      dispatch(fetchCiclos());
    }
  }, [ciclosStatus, dispatch]); // Dependências do efeito

  // Lógica de renderização baseada no status
  let content;
  if (ciclosStatus === "loading") {
    content = <p>Carregando ciclos...</p>;
  } else if (ciclosStatus === "succeeded") {
    // Se a busca for bem-sucedida, agrupa os ciclos por 'tipo'
    const ciclosAgrupados = ciclos.reduce((acc, ciclo) => {
      const tipo = ciclo.tipo || "Sem Tipo";
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(ciclo);
      return acc;
    }, {});

    // Mapeia os grupos e depois os ciclos dentro de cada grupo
    content = Object.keys(ciclosAgrupados).map((tipo) => (
      <div key={tipo} className="cycle-section">
        <h2 className="cycle-title">
          {tipo} <span className="arrow">&#9660;</span>
        </h2>
        <Grid container spacing={2}>
          {ciclosAgrupados[tipo].map((ciclo) => (
            <Grid item xs={12} sm={6} md={4} key={ciclo.id}>
               <Link to={`/ciclo-funcionarios/${ciclo._id}`} className="card-link">
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
        className="cabecalho"
        maxWidth="lg"
        sx={{
          display: "flex", // Habilita Flexbox
          alignItems: "center", // Centraliza verticalmente
          justifyContent: "flex-start", // Alinha ao início (esquerda)
          gap: 60, // Adiciona um pequeno espaço entre a seta e o título
          py: 3, // Padding vertical
        }}
      >
        <Title className="titulo-pagina" titulo="Ciclos de Revisão" />
      </Container>

      <MenuNav label={"Ciclo de Revisão"} />
      <main className="ciclo-main">
        {content}
        {/* Renderização condicional do botão "Criar Ciclo" */}
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

const ciclosAdapter = createEntityAdapter({
  selectId: (ciclo) => ciclo._id,
});
