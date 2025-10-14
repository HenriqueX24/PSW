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
    </SimpleContainer>
  );
}

export default CriarConta;
