import React from "react";
import "./CardAvaliacao.css";
import { Link } from "react-router-dom";

/**
 * Componente de Card Reutilizável para uma Avaliação.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.titulo - O título da avaliação (ex: "Avaliação 360").
 * @param {string} props.data - A data associada à avaliação (ex: "18/08/2025").
 * @param {string} props.link - O URL completo para o link externo.
 * @returns {JSX.Element} O elemento do card de avaliação.
 */
const CardAvaliacao = ({ titulo, data, link }) => {
  // SVG do Ícone de Calendário (Data)
  const IconeCalendario = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="4"
        fill="none"
        stroke="#5cc6ba"
        strokeWidth="2"
      />
      <path
        d="M16 2v4M8 2v4M3 10h18"
        stroke="#5cc6ba"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // SVG do Ícone de Link 
  const IconeLink = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 13a5 5 0 0 1 7.07 0l1.41 1.41a5 5 0 0 1-7.07 7.07l-1.41-1.41"
        stroke="#5cc6ba"
        strokeWidth="2"
      />
      <path
        d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l1.41-1.41"
        stroke="#5cc6ba"
        strokeWidth="2"
      />
    </svg>
  );

  const isExternal = typeof link === "string" && /^(https?:)?\/\//.test(link);

  return (
    <div className="avaliacao-item">
      <div className="item-nome">{titulo}</div>
      <div className="item-info">
        <span className="item-data">
          {IconeCalendario}
          {data}
        </span>
        {/* Renderiza Link (react-router) para rotas internas e <a> para links externos */}
        {isExternal ? (
          <a
            href={link}
            className="item-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {IconeLink}
            Link
          </a>
        ) : (
          <Link to={link} className="item-link">
            {IconeLink}
            Link
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardAvaliacao;
