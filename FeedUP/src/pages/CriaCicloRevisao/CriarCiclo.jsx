// src/CriarCiclo.jsx
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addNewCiclo } from "../../features/user/ciclosSlice";
import "./criar-ciclo.css";
import NavBar from "../../Components/NavBar";
import { selectAllUsers } from "../../features/user/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import Title from "../../Components/Title";
import { Container, Box } from "@mui/material";
import NativeSelectDemo from "../../Components/NativeSelectDemo";

const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Título é obrigatório"),
  tipo: Yup.string().required("Tipo de ciclo é obrigatório"),
  inicio: Yup.string().required("Data de início é obrigatória"),
  termino: Yup.string().required("Data de término é obrigatória"),
  avaliadores: Yup.array().min(1, "Selecione ao menos um avaliador").required(),
  avaliados: Yup.string().required("Selecione um avaliado"), 
});

export default function CriarCiclo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(selectAllUsers);
  
  // Lista de gestores para a seção 'Avaliadores' (Checkbox)
  const gestoresList = userList.filter((user) => user.cargo === "gestor");

  // NOVO: Lista de funcionários para a seção 'Avaliados' (Seletor)
  const funcionariosList = userList.filter((user) => user.cargo === "funcionario");

  // Prepara as opções no formato {label: nome, value: email} usando APENAS funcionariosList
  const avaliadosOptions = funcionariosList.map((user) => ({
    label: user.nome,
    value: user.email,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avaliadores: [],
      avaliados: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // O campo avaliados (string) é convertido para array antes de enviar
      const cicloData = {
        ...data,
        avaliados: [data.avaliados], 
      };
      
      await dispatch(addNewCiclo(cicloData)).unwrap();

      alert("Ciclo criado com sucesso!");
      navigate("/ciclo-revisao");
    } catch (err) {
      alert("Falha ao criar o ciclo.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex", 
          alignItems: "center", 
          justifyContent: "flex-start", 
          gap: 60, 
          py: 3, 
        }}
      >
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
        <Title titulo={"Criar Ciclo"} />
      </Container>

      <main className="form-container">
        <form
          className="ciclo-form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          
          {/* Seção de Avaliados com NativeSelectDemo - Agora lista apenas funcionários */}
          <div className="form-group">
            
            <Controller
              name="avaliados"
              control={control}
              render={({ field }) => (
                <NativeSelectDemo
                  options={avaliadosOptions}
                  value={field.value}
                  onChange={field.onChange}
                  selectLabel="Avaliados"
                />
              )}
            />
            {errors.avaliados && (
              <p className="error-message">{errors.avaliados.message}</p>
            )}
          </div>
          
          {/* Seção de Avaliadores mantida com checkbox para multi-seleção */}
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

          <button type="submit" className="main-btn" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Ciclo"}
          </button>
        </form>
      </main>
      <NavBar />
    </Box>
  );
}