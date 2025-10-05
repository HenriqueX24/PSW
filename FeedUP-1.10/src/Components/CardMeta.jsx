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
  const statusClass = status ? status.toLowerCase().replace(/\s/g, '-') : 'pendente';

  return (
    <div className="goal-card">
      <div className="goal-info">
        <span className="goal-title">{titulo}</span>
        <span className="goal-desc">{descricao}</span>
        <span className={`goal-status ${statusClass}`}>
          {status} 
        </span>
      </div>
    </div>
  );
}

export default CardMeta;

