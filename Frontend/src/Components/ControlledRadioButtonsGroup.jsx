import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/**
 * Componente de exemplo (controlado) do Material-UI para um grupo de Radio buttons.
 * Permite selecionar entre "Funcionário" e "Gestor".
 *
 * Este componente gerencia seu próprio estado interno.
 *
 * @returns {JSX.Element} O grupo de radio buttons.
 */
export default function ControlledRadioButtonsGroup() {
  // Estado interno para controlar qual opção está selecionada
  const [value, setValue] = React.useState("female");

  // Atualiza o estado quando uma opção diferente é selecionada
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Perfil</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="Funcionário"
        />
        <FormControlLabel value="male" control={<Radio />} label="Gestor" />
      </RadioGroup>
    </FormControl>
  );
}
