import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ThemeProvider, Typography, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    ochre: {
      icon: "#e0e0e0",
      brand: "#5cc6ba",
      border: "#ececec",
      text: "#ffffff",
    },
  },
});

/**
 * Componente Slider Reutilizável com Material-UI.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.title - O título ou label do slider.
 * @param {number} props.min - O valor mínimo do slider (padrão: 1).
 * @param {number} props.max - O valor máximo do slider (padrão: 5).
 * @param {number} props.defaultValue - O valor padrão inicial do slider (padrão: 1).
 * @param {Array<{value: number, label: string}>} props.marks - As marcações a serem exibidas no slider.
 * @param {number} props.step - O passo para incrementação do valor (padrão: 1).
 * @param {number} [props.width=300] - A largura do Box que envolve o slider (em pixels).
 * @param {function} [props.onChange] - Função de callback chamada quando o valor muda (opcional).
 */

const handleChange = (event, newValue) => {
  console.log("Novo valor:", newValue);
};

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderLabel({
  title,
  min = 1,
  max = 5,
  defaultValue = 1,
  step = 1,
  width = 300,
  onChange = handleChange, // Adiciona um handler de mudança (opcional)
}) {
  const defaultMarks = [
  { value: 1, label: "Baixa" },
  { value: 5, label: "Alta" },
];
  return (
    <>
      <Typography id="input-slider" gutterBottom>
        {title || "Slider"} {/* Exibe o título passado por prop */}
      </Typography>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: 300 }}>
          <Slider
            margin="30"
            sx={{ color: "ochre.brand" }}
            min={min}
            max={max}
            aria-label="Custom marks"
            defaultValue={defaultValue}
            getAriaValueText={valuetext}
            step={step}
            marks={defaultMarks}
            width={width}
            valueLabelDisplay="auto"
            onChange={onChange}
          />
        </Box>
      </ThemeProvider>
    </>
  );
}
