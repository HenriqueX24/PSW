import React, { useEffect } from "react";
import "./metas.css";
import { useNavigate, useLocation } from "react-router-dom";
import MenuNav from "../../Components/MenuNav.jsx";
import NavBar from "../../Components/NavBar";
import ListaCardMeta from "../../Components/ListaCardMeta.jsx";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMetas, selectAllMetas } from "../../features/user/metaSlice";


export default function Metas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metas = useSelector(selectAllMetas); 
  const metasStatus = useSelector(state => state.metas.status); 
  const { isAuthenticated, currentUser } = useSelector((state) => state.login);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
     //So busca as metas se ainda não tivermos tentado
    if (metasStatus === 'idle') {
      dispatch(fetchMetas());
    }
  }, [metasStatus, isAuthenticated, dispatch, navigate]);
  let content;
   if (metasStatus === 'loading') {
    content = <p className="status-message">Carregando metas...</p>;
  } else if (metasStatus === 'succeeded') {
    content = <ListaCardMeta metas={metas} className="goals-section" />;
  } else if (metasStatus === 'failed') {
    content = <p className="status-message">Erro ao carregar as metas.</p>;
  }

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
        {content}
        {currentUser && currentUser.cargo === 'gestor' && (
        <button
          className="add-goal-btn"
          onClick={() => navigate("/criar-meta")}
        >
          <span className="plus-icon">+</span> Nova Meta
        </button>
         )}
      </main>

      {/* Bottom nav */}
      <NavBar />
    </>
  );
}
