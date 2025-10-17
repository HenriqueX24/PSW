import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
  { label: "Ciclo de Revisão", route: "/ciclo-revisao" },
  { label: "Funcionários", route: "/ciclo-funcionarios" },
  { label: "Avaliações", route: "/avaliacao" },
  { label: "Metas", route: "/metas" },
  { label: "Fazer Avaliação", route: "/fazer-avaliacao" },
];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define o step ativo baseado na rota atual
  const activeStep = steps.findIndex((step) =>
    location.pathname.startsWith(step.route)
  );

  // Navega para a rota do step clicado
  const handleStepClick = (index) => {
    const target = steps[index].route;

    const finalRoute = fallbackMap[target] || target;
    navigate(finalRoute);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 2 }}>
      <Stepper activeStep={activeStep >= 0 ? activeStep : 0} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{ cursor: "pointer" }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography
        variant="caption"
        align="center"
        sx={{ display: "block", mt: 1 }}
      >
        Siga os passos para concluir sua avaliação
      </Typography>
    </Box>
  );
}
