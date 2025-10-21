// src/CriarMeta.jsx
import React from "react";
import "./criar-meta.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "../../Components/NavBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addNewMeta } from "../../features/user/metaSlice";
import Title from "../../Components/Title";
import { Container, Box } from "@mui/material";

// O campo 'responsavel' agora será um select que deve ter um valor (email)
const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("O título da meta é obrigatório."),
  descricao: Yup.string()
    .required("A descrição é obrigatória.")
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  periodo: Yup.string().required("O período é obrigatório."),
  responsavel: Yup.string().required("O nome do responsável é obrigatório."),
});

export default function CriarMeta() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // NOVO: Busca e filtra a lista de usuários
  const userList = useSelector(selectAllUsers);
  const gestoresList = userList.filter((user) => user.cargo === "funcionario");

  // NOVO: Prepara as opções de responsáveis (gestores) no formato <option value="email">Nome</option>
  const responsavelOptions = gestoresList.map((user) => ({
    label: user.nome,
    value: user.email, // O valor será o email do gestor
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    try {
      await dispatch(addNewMeta({ ...data, status: "Pendente" })).unwrap();
      alert("Meta salva com sucesso!");
      navigate("/metas");
    } catch (err) {
      console.error("Falha ao salvar a meta: ", err);
      alert("Falha ao salvar a meta.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container
        maxWidth="lg"
        className="cabecalho"
        sx={{
          py: 3,
        }}
      >
        <button
          type="button"
          className="botao-voltar"
          aria-label="Voltar"
          onClick={() => navigate("/metas")}
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
        <Title titulo="Criar Meta" className="titulo-pagina" />
      </Container>

      <main>
        <form className="goal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="titulo">Título da Meta</label>
            <input
              type="text"
              id="titulo"
              placeholder="Ex: Aumentar vendas em 10%"
              {...register("titulo")}
            />
            {errors.titulo && (
              <p className="error-message">{errors.titulo.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={3}
              placeholder="Descreva a meta..."
              {...register("descricao")}
            />
            {errors.descricao && (
              <p className="error-message">{errors.descricao.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <input
              type="text"
              id="periodo"
              placeholder="01/07/2025 - 30/09/2025"
              {...register("periodo")}
            />
            {errors.periodo && (
              <p className="error-message">{errors.periodo.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="responsavel">Responsável</label>
            <select // NOVO: Usando <select> para o responsável
              id="responsavel"
              placeholder="Nome do responsável"
              {...register("responsavel")}
            />
            {errors.responsavel && (
              <p className="error-message">{errors.responsavel.message}</p>
            )}
          </div>

          <button type="submit" className="main-btn" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Meta"}
          </button>
        </form>
      </main>

      <NavBar />
    </Box>
  );
}