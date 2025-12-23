import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Passos serão definidos dinamicamente com base no tipo de usuário (gestor/funcionário).

/**
 * Componente de "Stepper" (Passo a Passo) de navegação.
 *
 * Exibe as etapas do fluxo principal da aplicação (Ciclo, Funcionários, Avaliações, etc.)
 * e destaca o passo ativo com base na URL atual (`useLocation`).
 * Permite a navegação ao clicar em um passo (`useNavigate`).
 *
 * @returns {JSX.Element} O componente stepper.
 */
export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const cargo = useSelector((state) => state.login.currentUser?.cargo);

  const steps =
    cargo === "gestor"
      ? [
          { label: "Ciclo de Revisão", route: "/ciclo-revisao" },
          //{ label: 'Funcionários', route: '/ciclo-funcionarios' },
          { label: "Avaliações", route: "/avaliacao" },
          { label: "Metas", route: "/metas" },
          { label: "Fazer Avaliação", route: "/fazer-avaliacao" },
        ]
      : [
          { label: "Ciclo de Revisão", route: "/ciclo-revisao" },
          //{ label: "Funcionários", route: "/ciclo-funcionarios" },
          { label: "Metas", route: "/metas" },
          { label: "Fazer Avaliação", route: "/fazer-avaliacao" },
        ];

  // Encontra o "step" ativo baseado na URL atual
  const activeStep = steps.findIndex((step) =>
    location.pathname.startsWith(step.route)
  );

  // Navega para a rota do step que foi clicado
  const handleStepClick = (index) => {
    const target = steps[index].route;
    navigate(target);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 2 }}>
      <Stepper activeStep={activeStep >= 0 ? activeStep : 0} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton
              onClick={() => handleStepClick(index)}
              sx={{ cursor: "pointer" }} // Adiciona cursor de clique
            >
              {step.label}
            </StepButton>
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
