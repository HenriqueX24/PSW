<<<<<<< HEAD
import React from "react";
import "./ciclo-funcionarios.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CicloFuncionarios() {
  const navigate = useNavigate();
  const { _ } = useParams(); // _ vindo de /ciclo-funcionarios/:id (ex.: 1)

  // Mock de funcionários do ciclo (coloque os IDs reais das avaliações se tiver)
  const employees = [
    {
      name: "Ana Souza",
      email: "ana.souza@email.com",
      dept: "Marketing",
      status: "realizado",
      avaliacaoId: 101, // /avaliacao/101
    },
    {
      name: "Carlos Lima",
      email: "carlos.lima@email.com",
      dept: "RH",
      status: "pendente",
      avaliacaoId: null, // sem avaliação ainda
    },
    {
      name: "Juliana Alves",
      email: "juliana.alves@email.com",
      dept: "TI",
      status: "realizado",
      avaliacaoId: 102,
    },
    {
      name: "Pedro Martins",
      email: "pedro.martins@email.com",
      dept: "Financeiro",
      status: "pendente",
      avaliacaoId: null,
    },
  ];

  return (
    <>
      <header className="header">
=======
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
>>>>>>> RefazendoFront
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
<<<<<<< HEAD
        <h1>Funcionários</h1>
      </header>

      <main>
        <section className="employee-list">
          {employees.map((emp, idx) => (
            <div key={idx} className="employee-card">
              <div className="employee-info">
                <span className="employee-name">{emp.name}</span>
                <span className="employee-email">{emp.email}</span>
                <span className="employee-dept">Departamento: {emp.dept}</span>
              </div>

              {emp.status === "realizado" ? (
                <div className="employee-actions">
                  <span className="status-label realizado">
                    Avaliação realizada
                  </span>
                  <button
                    type="button"
                    className="ver-avaliacao-btn"
                    onClick={() => navigate(`/avaliacao/${emp.avaliacaoId}`)}
                  >
                    Ver Avaliação
                  </button>
                </div>
              ) : (
                <span className="status-label pendente">
                  Avaliação pendente
                </span>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")} // troque pelo id real se precisar
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect
              x="6"
              y="6"
              width="20"
              height="20"
              rx="4"
              fill="#fff"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M12 17l4 4 6-8"
              stroke="#bdbdbd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="26"
              cy="8"
              r="4"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M28.5 5.5a4 4 0 0 1 0 5.66"
              stroke="#e0e0e0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="nav-icon btn-plain home"
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#5cc6ba">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-icon btn-plain"
          onClick={() => navigate("/perfil")}
          aria-label="Perfil"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#e0e0e0">
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </button>
      </nav>
    </>
  );
}
=======
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
>>>>>>> RefazendoFront
