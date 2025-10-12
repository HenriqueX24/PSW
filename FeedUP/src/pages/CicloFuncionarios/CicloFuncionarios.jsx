import "./ciclo-funcionarios.css";
import React, { useEffect } from "react";
import "./ciclo-funcionarios.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCicloById } from "../../features/user/ciclosSlice";
import { selectAllUsers } from "../../features/user/usersSlice";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import Title from "../../Components/Title"
import { Container, Box } from "@mui/material";

export default function CicloFuncionarios() {
  const navigate = useNavigate();
  const { id: cicloId } = useParams(); // _ vindo de /ciclo-funcionarios/:id (ex.: 1)
  const ciclo = useSelector((state) => selectCicloById(state, cicloId));
  const allUsers = useSelector(selectAllUsers);
  const { isAuthenticated } = useSelector((state) => state.login);

    useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

   if (!ciclo || allUsers.length === 0) {
    return <div>Carregando dados do ciclo...</div>;
  }
  
  const employeesInCycle = allUsers.filter(user => 
    ciclo.avaliados.includes(user.email)
  );

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
        }}>
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/ciclo-revisao")}
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
        {/*<h1>Funcionários do Ciclo: {ciclo.titulo}</h1>*/}
        <Title titulo={ciclo.titulo}/>
      </Container>
      
        <MenuNav />
        <main>
        <section className="employee-list">
          {employeesInCycle.map((emp) => {
            // Lógica de exemplo para o status da avaliação
            // Em uma aplicação real, este 'status' viria do objeto 'ciclo' ou 'emp'
            const avaliacaoStatus = emp.cargo === "gestor" ? "realizado" : "pendente";
            const avaliacaoId = emp.cargo === "gestor" ? 101 : null;

            return (
              // ======================================================================
              // A ESTRUTURA CORRETA DO CARD ESTÁ AQUI
              // ======================================================================
              <div key={emp.id} className="employee-card">
                
                {/* Caixa da Esquerda: Informações */}
                <div className="employee-info">
                  <span className="employee-name">{emp.nome}</span>
                  <span className="employee-email">{emp.email}</span>
                  <span className="employee-dept">Departamento: Marketing</span>
                </div>

                {/* Caixa da Direita: Ações e Status */}
                <div className="employee-actions">
                  {avaliacaoStatus === "realizado" ? (
                    <>
                      <span className="status-label realizado">
                        Avaliação realizada
                      </span>
                      <button
                        type="button"
                        className="ver-avaliacao-btn"
                        onClick={() => navigate(`/avaliacao/${avaliacaoId}`)}
                      >
                        Ver Avaliação
                      </button>
                      <button
                        type="button"
                        className="ver-avaliacao-btn"
                        onClick={() => navigate(`/metas`)}
                      >
                        Metas
                      </button>
                    </>
                  ) : (
                    <span className="status-label pendente">
                      Avaliação pendente
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <NavBar />
    </Box>
  );
}