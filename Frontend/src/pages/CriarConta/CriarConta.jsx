import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";
import "./Criarconta.css";
import Title from "../../Components/Title";
import SetaVoltar from "../../Components/SetaVoltar";
import { Container } from "@mui/material";

/**
 * Página "Criar Conta".
 *
 * Renderiza um layout de contêiner simples (`SimpleContainer`) que exibe
 * um título, um botão de voltar e o componente de formulário (`Forms`)
 * para o registro de um novo usuário.
 *
 * @returns {JSX.Element} A página de criação de conta.
 */
function CriarConta() {
  // A rota de destino para a tela de login.
  // Você deve substituir '/login' pela rota real da sua tela de login.
  const rotaLogin = '/login'; 

  return (
    <SimpleContainer>
      {/*<h1>Criar conta</h1>*/}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex", // Habilita Flexbox
          alignItems: "center", // Centraliza verticalmente
          justifyContent: "flex-start", // Alinha ao início (esquerda)
          gap: 50, // Adiciona um pequeno espaço entre a seta e o título
          py: 3, // Padding vertical
        }}
      >
      {/* Passando a rota de destino para SetaVoltar */}
      <SetaVoltar destino={rotaLogin} /> 
      <Title titulo='Criar conta' />
      </Container>
      <Forms />
    </SimpleContainer>
  );
}

export default CriarConta;
