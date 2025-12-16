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


/**
 * Componente de formulário de "pesquisa" (Survey).
 *
 * Agrupa múltiplos componentes `RowRadioButtonsGroup` para
 * renderizar um conjunto de perguntas.
 * As funções de 'onChange' para cada pergunta são recebidas via props.
 *
 * @param {object} props - As propriedades do componente.
 *L* @param {function} props.onQ1Change - Callback para a mudança na Questão 1.
 * @param {function} props.onQ2Change - Callback para a mudança na Questão 2.
 * @param {function} props.onQ3Change - Callback para a mudança na Questão 3.
 * @returns {JSX.Element} O formulário da pesquisa.
 */
export default function SurveyForm({ onQ1Change, onQ2Change, onQ3Change }) {
  return (
    <div>
      
      <RowRadioButtonsGroup
        groupLabel={q1.title}
        options={deadlineOptions}
        name="deadline-evaluation-1" 
        onChange={onQ1Change} 
      />

      <hr style={{ margin: "20px 0" }} />

      
      <RowRadioButtonsGroup
        groupLabel={q2.title}
        options={satisfactionOptions}
        name="project-satisfaction"
        onChange={onQ2Change} 
      />

      <hr style={{ margin: "20px 0" }} />

      <RowRadioButtonsGroup
        groupLabel={q3.title}
        options={deadlineOptions}
        name="deadline-evaluation-3" 
        onChange={onQ3Change} 
      />

      <hr style={{ margin: "20px 0" }} />
    </div>
  );
}
