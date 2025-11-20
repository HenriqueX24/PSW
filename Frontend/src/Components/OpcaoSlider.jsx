// OpcaoSlider.jsx
import React from "react";
import { Box, TextField, Typography, Slider } from "@mui/material";

/**
 * Componente "filho" para `CardQuestao`.
 * Renderiza os campos de texto para definir as propriedades de uma
 * questão do tipo "Slider" (Valor Mínimo, Máximo, Labels, Step).
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.questao - O objeto da questão (contendo { id, slider }).
 * @param {function} props.atualizarQuestao - Callback (id, updates) para atualizar o estado no componente pai.
 * @returns {JSX.Element} Os campos de input para as opções do slider.
 */
function OpcaoSlider({ questao, atualizarQuestao }) {
  const { id, slider } = questao;
  const { min, max, step, labelMin, labelMax } = slider;

  // Handler para atualizar qualquer propriedade do objeto 'slider'
  const handleSliderChange = (prop, value) => {
    // Garante que min, max e step sejam salvos como números
    const novoValor =
      prop === "min" || prop === "max" || prop === "step"
        ? Number(value)
        : value;
    // Chama a função do pai para atualizar o estado
    atualizarQuestao(id, { slider: { ...slider, [prop]: novoValor } });
  };

  // Configuração das "marcas" (labels) para o preview do slider
  const marks = [
    { value: min, label: labelMin },
    { value: max, label: labelMax },
  ];

  return (
    <Box>
      <Typography gutterBottom>Preview do Slider:</Typography>
      {/* Slider de preview (desabilitado) */}
      <Slider
        value={[min]} // Mostra apenas o início
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        marks={marks}
        disabled // O usuário não pode interagir com o preview
      />

      {/* Campos de Input para configurar o Slider */}
      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
        <TextField
          label="Valor Mínimo"
          type="number"
          size="small"
          value={min}
          onChange={(e) => handleSliderChange("min", e.target.value)}
          sx={{ flexGrow: 1, minWidth: "120px" }}
        />
        <TextField
          label="Valor Máximo"
          type="number"
          size="small"
          value={max}
          onChange={(e) => handleSliderChange("max", e.target.value)}
          sx={{ flexGrow: 1, minWidth: "120px" }}
        />
        <TextField
          label="Step (Incremento)"
          type="number"
          size="small"
          value={step}
          onChange={(e) => handleSliderChange("step", e.target.value)}
          sx={{ flexGrow: 1, minWidth: "120px" }}
        />
      </Box>

      {/* Campos de Input para configurar os Labels (Textos) */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label="Label Mínimo"
          size="small"
          value={labelMin}
          onChange={(e) => handleSliderChange("labelMin", e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Label Máximo"
          size="small"
          value={labelMax}
          onChange={(e) => handleSliderChange("labelMax", e.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
}

export default OpcaoSlider;
