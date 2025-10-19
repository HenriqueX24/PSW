// fileName: CardFuncionario.jsx (Atualizado)
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Propriedades: employee, avaliacaoStatus, avaliacaoId (para navegação)
export default function CardFuncionario({ employee, avaliacaoStatus, avaliacaoId }) {
  const navigate = useNavigate();
  
  const { id, nome, email } = employee;

  const handleViewEvaluation = () => {
    // Note: Esta navegação só deve ser chamada se o status for 'pendente' conforme a nova regra
    if (avaliacaoId) { 
      navigate(`/avaliacao/${avaliacaoId}`);
    }
  };

  const handleViewGoals = () => {
    navigate(`/metas`); // Navega para a página de metas
  };

  return (
    <div key={id} className="employee-card">
      
      {/* Caixa da Esquerda: Informações */}
      <div className="employee-info">
        <span className="employee-name">{nome}</span>
        <span className="employee-email">{email}</span>
        <span className="employee-dept">Departamento: Marketing</span>
      </div>

      {/* Caixa da Direita: Ações e Status */}
      <div className="employee-actions">
        
        {/* Exibição do Status (Realizado ou Pendente) */}
        <span className={`status-label ${avaliacaoStatus}`}>
          Avaliação {avaliacaoStatus}
        </span>
        
        {/* Lógica: Botão "Ver Avaliação" aparece SE status for 'pendente' */}
        {avaliacaoStatus === "pendente" && (
          <button
            type="button"
            className="ver-avaliacao-btn"
            onClick={handleViewEvaluation}
          >
            Ver Avaliação
          </button>
        )}

        {/* Lógica: Botão "Metas" aparece SEMPRE para funcionários no ciclo 
           (Simulando que todos têm metas cadastradas) */}
        <button
          type="button"
          className="ver-avaliacao-btn"
          onClick={handleViewGoals}
        >
          Metas
        </button>
        
      </div>
    </div>
  );
}