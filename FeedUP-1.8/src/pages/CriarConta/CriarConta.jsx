// src/pages/CriarConta/CriarConta.jsx

import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms"; // Importa o componente de formulário completo
import "./Criarconta.css";

function CriarConta() {
  // TODA A LÓGICA (useState, handlers, etc.) FOI REMOVIDA DAQUI.

  return (
    <SimpleContainer>
      <h1>Criar conta</h1>

      {/* Apenas renderizamos o componente Forms. Ele agora cuida de tudo sozinho. */}
      <Forms />
    </SimpleContainer>
  );
}

export default CriarConta;
