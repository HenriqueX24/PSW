import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Componente de seleção customizado.
 * @param {object} props - As propriedades do componente.
 * @param {Array<{label: string}>} props.options - As opções a serem exibidas no seletor.
 * @param {number | string} props.value - O valor atualmente selecionado.
 * @param {Function} props.onChange - A função a ser chamada quando o valor mudar.
 */
export default function NativeSelectDemo({ options, value, onChange }) {
  // A função handleChange agora chama a função onChange passada pelo componente pai
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        {/* O rótulo foi alterado para "Situação" */}
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={value}
          onChange={handleChange}
          label="Situação"
        >
          {/* Mapeia as opções recebidas para criar os itens do menu */}
          {options.map((option, index) => (
            <MenuItem key={option.label} value={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}