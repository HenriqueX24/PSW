// fileName: CicloFuncionarios.jsx (Atualizado para incluir Gestores)
import "./ciclo-funcionarios.css";
import React, { useEffect } from "react";
import CardFuncionario from "../../Components/CardFuncionario"; 
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
  const { id: cicloId } = useParams(); 
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
  
  // CORREÇÃO: Filtra APENAS os usuários que estão no ciclo. 
  // Não há mais filtro por cargo (gestores e funcionários são incluídos).
  const employeesInCycle = allUsers.filter(user => 
    ciclo.avaliados.includes(user.email)
  );

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container 
       maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 60,
          py: 3,
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
        <Title titulo={ciclo.titulo}/>
      </Container>
      
        <MenuNav />
        <main>
        <section className="employee-list">
          {employeesInCycle.map((emp) => {
            
            // SIMULAÇÃO: Definindo todos como "pendente" para que o botão "Ver Avaliação"
            // apareça tanto para Pedro quanto para o Gestor, conforme o requisito.
            const avaliacaoStatus = "pendente"; 
            const avaliacaoId = 101; 

            // Nota: O botão "Metas" sempre aparecerá, pois não há condição limitando-o no CardFuncionario.

            return (
              <CardFuncionario
                key={emp.id}
                employee={emp}
                avaliacaoStatus={avaliacaoStatus} // "pendente" para todos
                avaliacaoId={avaliacaoId} 
              />
            );
          })}
        </section>
      </main>

      <NavBar />
    </Box>
  );
}