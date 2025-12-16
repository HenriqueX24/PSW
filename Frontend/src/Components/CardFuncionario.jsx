// fileName: CardFuncionario.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Card para exibir um funcionário dentro de um ciclo de avaliação.
 * Mostra o status da avaliação e ações (Ver Avaliação, Ver Metas).
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.employee - O objeto do funcionário ({ id, nome, email }).
 * @param {string} props.avaliacaoStatus - O status da avaliação (ex: "pendente", "realizado").
 * @param {string | number} props.avaliacaoId - O ID da avaliação, usado para navegar para a avaliação.
 * @returns {JSX.Element} O card do funcionário.
 */
export default function CardFuncionario({ employee, avaliacaoStatus, avaliacaoId }) {
  const navigate = useNavigate();
  
  const { _id, nome, email } = employee;

  // Navega para a página de detalhes da avaliação específica
  const handleViewEvaluation = () => {
    if (avaliacaoId) { 
      navigate(`/fazer-avaliacao/${avaliacaoId}`);
    }
  };

  // Navega para a página de metas do funcionário
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
        
        {/* Exibição do Status  */}
        <span className={`status-label ${avaliacaoStatus}`}>
          Avaliação {avaliacaoStatus}
        </span>
        
        {/* Botão "Ver Avaliação" aparece se status for 'pendente' */}
        {avaliacaoStatus === "pendente" && (
          <button
            type="button"
            className="ver-avaliacao-btn"
            onClick={handleViewEvaluation}
          >
            Ver Avaliação
          </button>
        )}

        {/* Botão "Metas" aparece SEMPRE */}
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
