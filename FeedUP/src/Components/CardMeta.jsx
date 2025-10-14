// src/Components/CardMeta.jsx
import React from 'react';
import "./CardMeta.css";

function CardMeta({ meta, hideStatus = false }) {
  if (!meta) {
    return null;
  }

  const { titulo, descricao, status } = meta;
  const statusClass = status ? status.toLowerCase().replace(/\s/g, '-') : 'pendente';

  return (
    // Usa a nova classe principal 'goal-card-container'
    <div className="goal-card-container"> 
      <span className="goal-title">{titulo}</span>
      <span className="goal-desc">{descricao}</span>
      
      {/* O status só é renderizado se 'hideStatus' for falso */}
      {!hideStatus && (
        <span className={`goal-status ${statusClass}`}>
          {status} 
        </span>
      )}
    </div>
  );
}

export default CardMeta;
