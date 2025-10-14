<<<<<<< HEAD
// src/CriarCiclo.jsx
import React, { useState } from "react";
import "./criar-ciclo.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";

export default function CriarCiclo() {
  const [periodo, setPeriodo] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);

  const navigate = useNavigate();

  const handleFuncionarioChange = (email) => {
    setFuncionarios((prev) =>
      prev.includes(email) ? prev.filter((f) => f !== email) : [...prev, email]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!periodo || !avaliacao || funcionarios.length === 0) {
      alert("Preencha todos os campos.");
      return;
    }
    alert("Ciclo salvo com sucesso!");
    navigate("/ciclo-revisao");
  };

  return (
    <div className="container">
      <header className="header">
=======
// src/CriarCiclo.jsximport React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addNewCiclo } from "../../features/user/ciclosSlice";
import "./criar-ciclo.css";
import NavBar from "../../Components/NavBar";
import { selectAllUsers } from "../../features/user/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import Title from "../../Components/Title"
import { Container, Box } from "@mui/material";

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Título é obrigatório"),
  tipo: Yup.string().required("Tipo de ciclo é obrigatório"),
  inicio: Yup.string().required("Data de início é obrigatória"),
  termino: Yup.string().required("Data de término é obrigatória"),
  avaliadores: Yup.array().min(1, "Selecione ao menos um avaliador").required(),
  avaliados: Yup.array().min(1, "Selecione ao menos um avaliado").required(),
});

export default function CriarCiclo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(selectAllUsers);
  const gestoresList = userList.filter((user) => user.cargo === "gestor");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avaliadores: [],
      avaliados: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(addNewCiclo(data)).unwrap();

      alert("Ciclo criado com sucesso!");
      navigate("/ciclo-revisao");
    } catch (err) {
      alert("Falha ao criar o ciclo.");
      console.error(err);
    }
  };

  return (
    
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        {/* 1. TÍTULO 'Menu' (Movido para cima da AppBar) */}
        <Container
          maxWidth="lg"
          sx={{
            display: "flex", // Habilita Flexbox
            alignItems: "center", // Centraliza verticalmente
            justifyContent: "flex-start", // Alinha ao início (esquerda)
            gap: 60, // Adiciona um pequeno espaço entre a seta e o título
            py: 3, // Padding vertical
          }}
        >
>>>>>>> RefazendoFront
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/ciclo-revisao")}
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
<<<<<<< HEAD
        <h1>Criar Ciclo de Revisão</h1>
      </header>

      <main>
        <form className="ciclo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <select
              id="periodo"
              name="periodo"
              required
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="avaliacao">Avaliação</label>
            <div className="avaliacao-cards">
              <label className="avaliacao-card">
                <input
                  type="radio"
                  name="avaliacao"
                  value="avaliacao360"
                  required
                  checked={avaliacao === "avaliacao360"}
                  onChange={() => setAvaliacao("avaliacao360")}
                />
                <div>
                  <span className="avaliacao-title">Avaliação 360</span>
                  <span className="avaliacao-desc">18/08/2025</span>
                </div>
              </label>

              <label className="avaliacao-card">
                <input
                  type="radio"
                  name="avaliacao"
                  value="avaliacaoPCH"
                  checked={avaliacao === "avaliacaoPCH"}
                  onChange={() => setAvaliacao("avaliacaoPCH")}
                />
                <div>
                  <span className="avaliacao-title">Avaliação PCH</span>
                  <span className="avaliacao-desc">18/06/2025</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Funcionários</label>
            <div className="funcionarios-cards">
              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="ana.souza@email.com"
                  checked={funcionarios.includes("ana.souza@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("ana.souza@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Ana Souza</span>
                  <span className="funcionario-depto">Vendas</span>
                </div>
              </label>

              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="carlos.lima@email.com"
                  checked={funcionarios.includes("carlos.lima@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("carlos.lima@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Carlos Lima</span>
                  <span className="funcionario-depto">RH</span>
                </div>
              </label>

              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="juliana.alves@email.com"
                  checked={funcionarios.includes("juliana.alves@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("juliana.alves@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Juliana Alves</span>
                  <span className="funcionario-depto">TI</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="main-btn">
            Salvar Ciclo
=======
        <Title titulo={"Criar Ciclo"}/>
      </Container>
      
      <main className="form-container">
        <form className="criar-avaliacao-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Título do Ciclo de Revisão</label>
            <input
              {...register("titulo")}
              placeholder="Ex: Avaliação de Desempenho Q1"
            />
            {errors.titulo && (
              <p className="error-message">{errors.titulo.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Tipo de Ciclo</label>
            <select {...register("tipo")}>
              <option value="">Selecione...</option>
              <option value="Mensal">Mensal</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
            {errors.tipo && (
              <p className="error-message">{errors.tipo.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Data de Início</label>
            <input type="date" {...register("inicio")} />
            {errors.inicio && (
              <p className="error-message">{errors.inicio.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Data de Término</label>
            <input type="date" {...register("termino")} />
            {errors.termino && (
              <p className="error-message">{errors.termino.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Avaliadores</label>
            <div className="checkbox-group">
              {gestoresList.map((user) => (
                <label key={user.id}>
                  <input
                    type="checkbox"
                    value={user.email}
                    {...register("avaliadores")}
                  />
                  {user.nome}
                </label>
              ))}
            </div>
            {errors.avaliadores && (
              <p className="error-message">{errors.avaliadores.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Avaliados</label>
            <div className="checkbox-group">
              {userList.map((user) => (
                <label key={user.id}>
                  <input
                    type="checkbox"
                    value={user.email}
                    {...register("avaliados")}
                  />
                  {user.nome}
                </label>
              ))}
            </div>
            {errors.avaliados && (
              <p className="error-message">{errors.avaliados.message}</p>
            )}
          </div>

          <button type="submit" className="main-btn" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Ciclo"}
>>>>>>> RefazendoFront
          </button>
        </form>
      </main>
      <NavBar />
<<<<<<< HEAD
    </div>
=======
      </Box>
    
>>>>>>> RefazendoFront
  );
}
