import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Componente de seleção customizado.
 * @param {object} props - As propriedades do componente.
 * @param {Array<{label: string, value: string|number}>} props.options - As opções a serem exibidas no seletor, agora incluindo 'value'.
 * @param {number | string} props.value - O valor atualmente selecionado.
 * @param {Function} props.onChange - A função a ser chamada quando o valor mudar.
 * @param {string} [props.selectLabel='Status'] - O rótulo a ser exibido no seletor.
 */

export default function NativeSelectDemo({ options, value, onChange, selectLabel = 'Status' }) {
  // A função handleChange agora chama a função onChange passada pelo componente pai
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  // Adiciona uma opção de placeholder no início
  const selectOptions = [
    { label: `Selecione um(a) ${selectLabel}`, value: "" },
    ...options
  ];

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="select-label">{selectLabel}</InputLabel>
        <Select
          labelId="select-label"
          id="custom-select"
          value={value}
          onChange={handleChange}
          label={selectLabel}
        >
          {/* Mapeia as opções para criar os itens do menu, usando option.value 
          {selectOptions.map((option) => (
            <MenuItem 
              key={option.value || option.label} 
              value={option.value} // Agora usa o valor real (email)
            >
              {option.label}
            </MenuItem>
          ))}*/}
          <MenuItem value="" disabled={true}>
            Selecione um(a) {selectLabel}
          </MenuItem>

          {/* Mapeia as opções usando o ÍNDICE como o valor. */}
          {options.map((option, index) => (
            <MenuItem 
              key={option.label} 
              value={option.label} // <--- CORREÇÃO: Usa o índice do array como o valor
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}