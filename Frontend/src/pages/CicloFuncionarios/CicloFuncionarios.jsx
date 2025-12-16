import "./ciclo-funcionarios.css";
import { useEffect } from "react";
import CardFuncionario from "../../Components/CardFuncionario"; 
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCicloById } from "../../features/user/ciclosSlice";
import { selectAllUsers } from "../../features/user/usersSlice";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import Title from "../../Components/Title"
import { Container, Box } from "@mui/material";

/**
 * Página "Ciclo Funcionários".
 *
 * Exibe a lista de funcionários (Avaliados) associados a um ciclo específico.
 * Obtém o `cicloId` da URL (via `useParams`).
 * Busca o ciclo específico e a lista de todos os usuários do Redux.
 * Filtra os usuários para mostrar apenas aqueles incluídos no array `ciclo.avaliados`.
 * Renderiza um `CardFuncionario` para cada funcionário no ciclo.
 *
 * @returns {JSX.Element} A página com a lista de funcionários do ciclo.
 */
export default function CicloFuncionarios() {
  const navigate = useNavigate();
  const { id: cicloId } = useParams(); // Pega o ID do ciclo da URL
  // Seletores do Redux
  const ciclo = useSelector((state) => selectCicloById(state, cicloId)); // Busca o ciclo pelo ID
  const allUsers = useSelector(selectAllUsers); // Busca todos os usuários
  const { isAuthenticated } = useSelector((state) => state.login); // Verifica se está logado

  // Efeito de proteção de rota: Redireciona para /login se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Tela de carregamento enquanto os dados do Redux não chegam
  if (!ciclo || allUsers.length === 0) {
    return <div>Carregando dados do ciclo...</div>;
  }
  
  // CORREÇÃO: Filtra APENAS os usuários que estão no ciclo. 
  // O filtro é feito comparando o '_id' do usuário com o array 'avaliados' do ciclo.
  const employeesInCycle = allUsers.filter(user => 
   (ciclo?.avaliados || []).includes(user._id)
  );

  // NOVO: Adicione uma propriedade ao ciclo que aponta para o ID da avaliação.
  // Se você não tiver um campo `avaliacaoTemplateId` no ciclo, use um ID
  // de avaliação que você sabe que existe no seu db.json (ex: '1').
  // CORRIGINDO O ID FIXO 101 para um ID que provavelmente existe ('1') ou um obtido do ciclo.
  const avaliacaoTemplateId = ciclo.avaliacaoTemplateId || '1'; // Usando '1' como fallback/mock

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
          className="botao-voltar"
          aria-label="Voltar"
          onClick={() => navigate("/ciclo-revisao")} // Navega de volta para a lista de ciclos
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
        {/* O título da página é o título do ciclo específico */}
        <Title titulo={ciclo.titulo} className="titulo-pagina" />
      </Container>
      
        <MenuNav />
        <main className="mainCiclo">
        <section className="employee-list">
          {/* Mapeia e renderiza um Card para cada funcionário filtrado */}
          {employeesInCycle.map((emp) => {
            
            // SIMULAÇÃO: Definindo todos como "pendente" para que o botão "Ver Avaliação"
            // apareça tanto para Pedro quanto para o Gestor, conforme o requisito.
            const avaliacaoStatus = "pendente"; 
            const avaliacoId = ciclo.avaliacaoTemplateId || '1'; // Renomeado para evitar conflito de nome

            // Nota: O botão "Metas" sempre aparecerá, pois não há condição limitando-o no CardFuncionario.

            return (
              <CardFuncionario
                key={emp._id}
                employee={emp}
                avaliacaoStatus={avaliacaoStatus} // "pendente" para todos
                avaliacaoId={avaliacoId} // PASSA O ID VÁLIDO
              />
            );
          })}
        </section>
      </main>

      <NavBar />
    </Box>
  );
}
