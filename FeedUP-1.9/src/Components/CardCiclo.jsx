import React from "react";
import "./CardCiclo.css";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
//escrever como componente funcional!
export default function CardCiclo() {
    const navigate = useNavigate();
    return (
    <>
      <Grid size={3} item>
        <button
          className="review-card-btn"
          onClick={() => navigate("/ciclo-funcionarios/1")}
        >
          <div className="review-info">
            <span className="review-title">Avaliação 360</span>
            <div className="review-meta">
              <span className="icon-calendar">
                <svg width="20" height="20" fill="none">
                  <rect
                    x="3"
                    y="6"
                    width="14"
                    height="11"
                    rx="3"
                    fill="#7ED6C0"
                  />
                  <path d="M14 2v4M6 2v4" stroke="#fff" strokeWidth="2" />
                  <rect x="3" y="10" width="14" height="2" fill="#fff" />
                </svg>
              </span>
              <span className="review-date">Início: 01/08/2025</span>
              <span className="review-date">Término: 31/08/2025</span>
            </div>
          </div>
        </button>
      </Grid>
    </>
  );
}
