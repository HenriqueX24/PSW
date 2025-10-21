import React, { useEffect } from "react";
import "./metas.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MenuNav from "../../Components/MenuNav.jsx";
import NavBar from "../../Components/NavBar.jsx";
import CardMeta from "../../Components/CardMeta.jsx";
import { Typography, Grid, Box, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMetas, selectAllMetas } from "../../features/user/metaSlice.js";
import Title from "../../Components/Title.jsx";
import ButtonCreate from "../../Components/ButtonCreate.jsx";
import SetaVoltar from "../../Components/SetaVoltar.jsx";

export default function Metas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metas = useSelector(selectAllMetas);
  const metasStatus = useSelector((state) => state.metas.status);
  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
  useEffect(() => {
    if (metasStatus === "idle") {
      dispatch(fetchMetas());
    }
  }, [metasStatus, dispatch]);

  let content;
  if (metasStatus === "loading") {
    content = <p className="status-message">Carregando metas...</p>;
  } else if (metasStatus === "succeeded") {
    const metasAgrupadas = metas.reduce((acc, meta) => {
      const status = meta.status || "Sem Status";
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(meta);
      return acc;
    }, {});

    content = Object.keys(metasAgrupadas).map((status) => (
      <div key={status} className="cycle-section">
        <h2 className="cycle-title">{status}</h2>{" "}
        {/* Removida a seta para um visual mais limpo */}
        {/* MUDANÇA: Usa o Grid do Material-UI para o layout em "caixinhas" */}
        <Grid container spacing={2}>
          {metasAgrupadas[status].map((meta) => (
            <Grid item xs={12} sm={6} md={4} key={meta.id}>
              <Link to={`/meta-detalhe/${meta.id}`} className="card-link">
                {/* MUDANÇA: Passa a prop hideStatus={true} */}
                <CardMeta meta={meta} hideStatus={true} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    ));
  } else if (metasStatus === "failed") {
    content = <p className="status-message">Erro ao carregar as metas.</p>;
  }

  return (
    <>
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container
          maxWidth="lg"
          className="cabecalho"
          sx={{
            py: 3, // Padding vertical
          }}
        >
          <SetaVoltar />

          <Title titulo={"Metas"} className="titulo-pagina" />
        </Container>

        {/* Navbar */}
        <MenuNav />

        {/* Main content */}

        <main className="ciclo-main">
          {content}
          {currentUser && currentUser.cargo === "gestor" && (
            <button
              className="add-goal-btn"
              onClick={() => navigate("/criar-meta")}
            >
              <span className="plus-icon">+</span> Nova Meta
            </button>
          )}
        </main>
        {/* Bottom nav */}
        <NavBar />
      </Box>
    </>
  );
}