import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";
import Title from "../../Components/Title";
import SetaVoltar from "../../Components/SetaVoltar";
import { Container } from "@mui/material";

/**
 * Página "Editar Perfil".
 *
 * Esta é uma página "wrapper" (invólucro).
 * Ela renderiza o componente reutilizável `Forms` dentro de um `SimpleContainer`.
 * O componente `Forms` (documentado anteriormente) detecta automaticamente
 * que está em modo de edição (provavelmente pela URL) e carrega os
 * dados do usuário logado para edição.
 *
 * @returns {JSX.Element} A página de edição de perfil.
 */
function EditarPerfil() {

  return (
    <SimpleContainer>
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
      <SetaVoltar destino={'/perfil'} />
      <Title titulo='Editar conta' />
      </Container>
      {/* O componente 'Forms' gerencia toda a lógica de edição */}
      <Forms />
    </SimpleContainer>
  );
}

export default EditarPerfil;
