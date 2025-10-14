import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";
import Title from "../../Components/Title";

function EditarPerfil() {

  return (
    <SimpleContainer>
      {/*<h1>Criar conta</h1>*/}
      <Title titulo='Editar conta' />
      <Forms />
    </SimpleContainer>
  );
}

export default EditarPerfil;
