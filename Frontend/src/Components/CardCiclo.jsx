import React from "react";
import "./CardCiclo.css";
import { Grid } from "@mui/material";

/**
 * Componente Card para exibir informações resumidas de um Ciclo de Revisão.
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.ciclo - O objeto do ciclo contendo { titulo, inicio, termino }.
 * @returns {JSX.Element | null} O card do ciclo ou nulo se o ciclo não for fornecido.
 */
export default function CardCiclo({ ciclo }) {
  // Guard Clause: Não renderiza se o ciclo não for fornecido
  if (!ciclo) {
    return null;
  }

  return (
    <div className="review-card-btn">
      <div className="review-info">
        <span className="review-title">{ciclo.titulo}</span>
        <div className="review-meta">
          <span className="icon-calendar">
            {/* O SVG aqui está vazio, mas a estrutura está pronta */}
            <svg width="20" height="20" fill="none"></svg>
          </span>
          <span className="review-date">Início: {ciclo.inicio}</span>
          <span className="review-date">Término: {ciclo.termino}</span>
        </div>
      </div>
    </div>
  );
}
