import React from "react";


/**
 * Componente 'QuestionMark' (placeholder?).
 *
 * Atualmente, renderiza apenas um campo de texto (TextField) do Material-UI
 * com a label "Standard".
 *
 * @returns {JSX.Element} Um campo de texto.
 */
export default function QuestionMark() {
  return (
    <>
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </>
  );
}
