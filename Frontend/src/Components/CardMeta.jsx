// src/Components/CardMeta.jsx
import React from 'react';
import "./CardMeta.css";

/**
 * Componente Card para exibir uma Meta (Goal).
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.meta - O objeto da meta contendo { titulo, descricao, status }.
 * @param {boolean} [props.hideStatus=false] - Se verdadeiro, oculta a exibição do status.
 * @returns {JSX.Element | null} O card da meta ou nulo se a meta não for fornecida.
 */
function CardMeta({ meta, hideStatus = false }) {

  // "Guard Clause": Não renderiza nada se a prop 'meta' não for fornecida.
  if (!meta) {
    return null;
  }

  const { titulo, descricao, status } = meta;
  // Converte o status (ex: "Em Andamento") para uma classe CSS (ex: "em-andamento")
  const statusClass = status ? status.toLowerCase().replace(/\s/g, '-') : 'pendente';

  return (
    // Usa a nova classe principal 'goal-card-container'
    <div className="goal-card-container"> 
      <span className="goal-title">{titulo}</span>
      <span className="goal-desc">{descricao}</span>
      
      {/* Renderização Condicional: O status só é renderizado se 'hideStatus' for falso */}
      {!hideStatus && (
        <span className={`goal-status ${statusClass}`}>
          {status} 
        </span>
      )}
    </div>
  );
}

export default CardMeta;
