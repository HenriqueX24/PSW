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
import { Grid } from "@mui/material";


export default function CicloRevisao() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ciclos = useSelector(selectAllCiclos);
  const ciclosStatus = useSelector(state => state.ciclos.status);
  const { currentUser } = useSelector((state) => state.login);

  useEffect(() => {
    if (ciclosStatus === 'idle') {
      dispatch(fetchCiclos());
    }
  }, [ciclosStatus, dispatch]);
  let content;
  if (ciclosStatus === 'loading') {
    content = <p>Carregando ciclos...</p>;
  } else if (ciclosStatus === 'succeeded') {
    const ciclosAgrupados = ciclos.reduce((acc, ciclo) => {
      const tipo = ciclo.tipo || 'Sem Tipo';
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(ciclo);
      return acc;
    }, {});
    
    content = Object.keys(ciclosAgrupados).map(tipo => (
      <div key={tipo} className="cycle-section">
        <h2 className="cycle-title">{tipo} <span className="arrow">&#9660;</span></h2>
        <Grid container spacing={2}> 
          {ciclosAgrupados[tipo].map(ciclo => (
            <Grid item xs={12} sm={6} md={4} key={ciclo.id}>
              <Link to={`/ciclo-funcionarios/${ciclo.id}`} className="card-link">
                <CardCiclo ciclo={ciclo} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    ));
  } else if (ciclosStatus === 'failed') {
    content = <p>Erro ao carregar ciclos.</p>;
  }

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

   <MenuNav />
           <main className="ciclo-main">
        {content}
      <ButtonCreate nameButton={"Criar Ciclo"} onClick={() => navigate("/criar-ciclo")}/>
      </main>
      
      <NavBar />
    </>
  );
}
