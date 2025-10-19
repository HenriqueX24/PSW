import React, { useState, useEffect } from "react";
import "./FazerAvaliacao.css";
import { useNavigate, useParams } from "react-router-dom"; // Importa useParams
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";
import MenuNav from "../../Components/MenuNav";
import { Typography } from "@mui/material";
// Componentes estáticos removidos: SurveyForm, Slider
import { useSelector, useDispatch } from 'react-redux';
import { selectAvaliacaoById, fetchAvaliacoes } from "../../features/user/avaliacaoSlice";
import FormsAvaliacao from "../../Components/FormsAvaliacao"; // Importa o FormsAvaliacao

function FazerAvaliacao() {
  const { id } = useParams(); // Obtém o ID da URL
  const dispatch = useDispatch();
  
  // Busca a avaliação pelo ID do estado do Redux
  const avaliacao = useSelector(state => selectAvaliacaoById(state, String(id)));
  const avaliacaoStatus = useSelector(state => state.avaliacoes.status);

  const navigate = useNavigate();

  // Carrega as avaliações se necessário
  useEffect(() => {
    if (avaliacaoStatus === 'idle' || avaliacaoStatus === 'failed') {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacaoStatus, dispatch]);
  
  const handleVoltar = () => {
    navigate("/ciclo-revisao");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!avaliacao) {
        alert("Avaliação não carregada.");
        return;
    }
    
    // Simulação de envio...
    alert(`Avaliação "${avaliacao.titulo}" enviada com sucesso! (Simulação)`);
    navigate(-1); 
  };

  // --- Renderização Condicional ---
  if (avaliacaoStatus === 'loading' || avaliacaoStatus === 'idle') {
    return <Typography sx={{ p: 4 }}>Carregando Avaliação...</Typography>;
  }
  
  if (!avaliacao) {
    return <Typography sx={{ p: 4 }}>Avaliação com ID: {id} não encontrada.</Typography>;
  }

  return (
    <>
      {/* ... (Header e MenuNav) ... */}
      <MenuNav />
      <main>
        <form className="autoavaliacao-form" onSubmit={handleSubmit}>
          <div className="form-section">
            {/* NOVO: Usa o componente reutilizável FormsAvaliacao */}
            <FormsAvaliacao avaliacao={avaliacao} /> 
          </div>
          <ButtonSubmit />
        </form>
      </main>

      <NavBar />
    </>
  );
}

export default FazerAvaliacao;