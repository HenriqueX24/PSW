import React from "react";
import "./CardCiclo.css";
import { Grid } from "@mui/material";

export default function CardCiclo({ ciclo }) {
  if (!ciclo) {
    return null;
  }

  return (
    <div className="review-card-btn">
      <div className="review-info">
        <span className="review-title">{ciclo.titulo}</span>
        <div className="review-meta">
          <span className="icon-calendar">
            <svg width="20" height="20" fill="none"></svg>
          </span>
          <span className="review-date">Início: {ciclo.inicio}</span>
          <span className="review-date">Término: {ciclo.termino}</span>
        </div>
      </div>
    </div>
  );
}
