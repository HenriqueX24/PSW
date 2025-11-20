import React from "react";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";
import Title from "../../Components/Title";

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
      {/*<h1>Criar conta</h1>*/}
      <Title titulo='Editar conta' />
      {/* O componente 'Forms' gerencia toda a lógica de edição */}
      <Forms />
    </SimpleContainer>
  );
}

export default EditarPerfil;
