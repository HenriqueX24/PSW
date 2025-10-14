<<<<<<< HEAD
// src/pages/CriarConta/CriarConta.jsx

import React from 'react';
import SimpleContainer from '../../Components/SimpleContainer';
import Forms from '../../Components/Forms'; // Importa o componente de formulário completo
import "./Criarconta.css";



function CriarConta() {
  // TODA A LÓGICA (useState, handlers, etc.) FOI REMOVIDA DAQUI.

  return (
    <SimpleContainer>
      <h1>Criar conta</h1>
      
      {/* Apenas renderizamos o componente Forms. Ele agora cuida de tudo sozinho. */}
      <Forms />

=======
import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";
import "./Criarconta.css";
import Title from "../../Components/Title";

function CriarConta() {

  return (
    <SimpleContainer>
      {/*<h1>Criar conta</h1>*/}
      <Title titulo='Criar conta' />
      <Forms />
>>>>>>> RefazendoFront
    </SimpleContainer>
  );
}

<<<<<<< HEAD
export default CriarConta;
=======
export default CriarConta;
>>>>>>> RefazendoFront
