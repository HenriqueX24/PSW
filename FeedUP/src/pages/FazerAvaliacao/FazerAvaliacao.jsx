import React, { useState } from "react";
import "./autoavaliacao.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Input, Typography } from "@mui/material";
import SurveyForm from "../../Components/SurveyForm";
import Slider from "../../Components/Slider";
import ButtonCreate from "../../Components/ButtonCreate";

function FazerAvaliacao() {
  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [email, setEmail] = useState("");
  // State for SurveyForm (RowRadioButtonsGroup questions)
  const [q1Radio, setQ1Radio] = useState("");
  const [q2Radio, setQ2Radio] = useState("");
  const [q3Radio, setQ3Radio] = useState("");
  // State for Slider questions - they'll always have a number value from 1 to 5.
  const [q1Slider, setQ1Slider] = useState(1);
  const [q2Slider, setQ2Slider] = useState(1);
  const [q3, setQ3] = useState(3);
  const [q4, setQ4] = useState(3);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const handleVoltar = (e) => {
    navigate("/ciclo-revisao");
  };

  const handleButtonCreate = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit do form, se o botão for submit
    navigate("/criar-autoavaliacao/");
  };

  const handleSubmit = (e) => {
    // Check if the three radio questions have a value (not the initial empty string)
    if (!q1Radio || !q2Radio || !q3Radio) {
      alert(
        "Por favor, preencha todas as perguntas do Performance Review antes de enviar."
      );
      return; // Stop submission
    }
    // Note: Slider values are numbers (1-5) and will always have a value, so no need to check them unless the initial state was undefined.
    alert("Autoavaliação enviada com sucesso!");
    navigate("/sobre-app"); // volta pra SobreApp sem recarregar
  };

  // Handler for SurveyForm Radio Questions
  const handleSurveyChange = (question, value) => {
    if (question === "deadline-evaluation-1") {
      setQ1Radio(value);
    } else if (question === "project-satisfaction") {
      setQ2Radio(value);
    } else if (question === "communication-evaluation") {
      setQ3Radio(value);
    }
  };

  // Handler for Slider Questions
  const handleSlider1Change = (event, newValue) => {
    setQ1Slider(newValue);
  };
  const handleSlider2Change = (event, newValue) => {
    setQ2Slider(newValue);
  };

  return (
    // Fragmento do React para permitir dois elementos de nível superior (Container e Nav)
    <>
      {/* Menu superior com stepper */}

      <header className="autoavaliacao-header">
        <button
          type="button"
          className="voltar"
          aria-label="Voltar"
          onClick={handleVoltar}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>Autoavaliação</h1>
      </header>
      <MenuNav />
      <main>
        <form className="autoavaliacao-form" onSubmit={handleSubmit}>
          {/*
          <ButtonCreate
            nameButton="Criar autoavaliacão"
            onClick={handleButtonCreate}
          />
           */}
          <div className="form-section">
            <h2>Performance Review</h2>
            {/* Pass the handler and new props to SurveyForm */}
            <SurveyForm
              onQ1Change={(e, v) =>
                handleSurveyChange("deadline-evaluation-1", v)
              }
              onQ2Change={(e, v) =>
                handleSurveyChange("project-satisfaction", v)
              }
              onQ3Change={(e, v) =>
                handleSurveyChange("communication-evaluation", v)
              }
            />

            <div>
              <Slider
                title="1. Nível de Proatividade"
                onChange={handleSlider1Change} // Use specific handler
                defaultValue={q1Slider}
              />
              <hr style={{ margin: "40px 0" }} />
              <Slider
                title="2. Satisfação Geral"
                onChange={handleSlider2Change} // Use specific handler
                defaultValue={q2Slider}
              />
            </div>
          </div>
          <ButtonSubmit />
        </form>
      </main>

      {/* Bottom nav SPA: elemento irmao do SimpleContainer */}
      <NavBar />
    </>
  );
}

export default FazerAvaliacao;
