<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CardMeta.css";

/**
 * Componente de Card Reutilizável para uma Avaliação.
@param {object} props - As propriedades do componente.
@param {string} props.titulo - O título da meta (ex: "Aumentar vendas em 10%").
@param {string} props.descricao - A descrição da meta (ex: "Meta para o trimestre atual").
@param {string} props.status - O status da meta (ex: "Pendente", "Concluída", etc.).
@returns {JSX.Element} O elemento do card de meta.
*/

function CardMeta({ titulo, descricao, status }) {
  
  // Cria uma classe CSS a partir do status, tratando espaços
  // Exemplo: "Em andamento" -> "em-andamento"
  const statusClass = status.toLowerCase().replace(/\s/g, '-').replace('ú', 'u');

  return (
    <button
      className="goal-card-btn"
      onClick={() => navigate("/meta-detalhe/1")}
    >
      <div className="goal-info">
        <span className="goal-title">{titulo}</span>
        <span className="goal-desc">{descricao}</span>
        {/* AGORA O STATUS É USADO DIRETAMENTE DA PROP */}
        <span className={`goal-status ${statusClass}`}>
          {status} 
        </span>
      </div>
    </button>
  );
}

export default CardMeta;
export { CardMeta };
=======
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
>>>>>>> RefazendoFront
