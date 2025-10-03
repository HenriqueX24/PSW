import React from "react";
import "./metas.css";
import { useNavigate, useLocation } from "react-router-dom";
import MenuNav from "../../Components/MenuNav.jsx";
import NavBar from "../../Components/NavBar";
import ListaCardMeta from "../../Components/ListaCardMeta.jsx";
import { Typography } from "@mui/material";

export default function Metas() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/home")}
        >
          <svg width="24" height="24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#7ED6C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/*<h1>Metas</h1>*/}
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: 300,
            lineHeight: 1.2,
            margin: 0,
            color: "var(--brand)",
          }}
        >
          Metas
        </Typography>
      </header>

      <hr className="my-0 mb-4" />

      {/* Navbar */}
      <MenuNav />

      {/* Main content */}

      <main>
        <ListaCardMeta className="goals-section"></ListaCardMeta>

        <button
          className="add-goal-btn"
          onClick={() => navigate("/criar-meta")}
        >
          <span className="plus-icon">+</span> Nova Meta
        </button>
      </main>

      {/* Bottom nav */}
      <NavBar />
    </>
  );
}
