import React from "react";
import RowRadioButtonsGroup from "./RowRadioButtonsGroup"; // Adjust path as necessary

const q1 = {
  title: "1. Como você avalia sua capacidade de cumprir prazos?",
};
const q2 = {
  title: "2. Qual o seu nível de satisfação com o resultado do projeto?",
};

const q3 = {
  title: "3. Como você avalia sua comunicação com a equipe?",
};

const deadlineOptions = [
  { value: "excelente", label: "Excelente" },
  { value: "bom", label: "Bom" },
  { value: "regular", label: "Regular" },
  { value: "precisa melhorar", label: "Precisa Melhorar" },
];

const satisfactionOptions = [
  { value: "muito satisfeito", label: "Muito Satisfeito" },
  { value: "satisfeito", label: "Satisfeito" },
  { value: "neutro", label: "Neutro" },
  { value: "insatisfeito", label: "Insatisfeito" },
];
{
  /* 
const handleDeadlineChange = (event, newValue) => {
  console.log(`Nova avaliação de prazo: ${newValue}`);
};

const handleSatisfactionChange = (event, newValue) => {
  console.log(`Nova avaliação de satisfação: ${newValue}`);
};
*/
}
export default function SurveyForm({ onQ1Change, onQ2Change, onQ3Change }) {
  return (
    <div>
      {/* 1. Replicating the Original Component */}
      <RowRadioButtonsGroup
        groupLabel={q1.title}
        options={deadlineOptions}
        name="deadline-evaluation-1" // Unique name for Q1
        onChange={onQ1Change} // Passed from FazerAvaliacao
      />

      <hr style={{ margin: "20px 0" }} />

      {/* 2. Using the Component for a Different Question */}
      <RowRadioButtonsGroup
        groupLabel={q2.title}
        options={satisfactionOptions}
        name="project-satisfaction"
        onChange={onQ2Change} // Passed from FazerAvaliacao
      />

      <hr style={{ margin: "20px 0" }} />

      <RowRadioButtonsGroup
        groupLabel={q3.title}
        options={deadlineOptions}
        name="deadline-evaluation-3" // Unique name for Q3
        onChange={onQ3Change} // Passed from FazerAvaliacao
      />

      <hr style={{ margin: "20px 0" }} />
    </div>
  );
}
