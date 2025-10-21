// src/CriarMeta.jsx
import React from "react";
import "./criar-meta.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Adicionado useSelector
import NavBar from '../../Components/NavBar'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addNewMeta } from "../../features/user/metaSlice";
import Title from "../../Components/Title";
import { Container, Box } from "@mui/material";
import { selectAllUsers } from "../../features/user/usersSlice"; // Importado selectAllUsers

// O campo 'responsavel' agora será um select que deve ter um valor (email)
const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("O título da meta é obrigatório."),
  descricao: Yup.string()
    .required('A descrição é obrigatória.')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  // O período usa o mesmo campo, mas o nome do input é 'periodo'. Vou assumir que 'periodo' é o campo de data de início
  // e 'termino' para a data de término (corrigindo o input de término para usar um campo diferente).
  inicio: Yup.string() // NOVO: Adicionei 'inicio'
    .required('A data de início é obrigatória.'),
  termino: Yup.string() // NOVO: Adicionei 'termino'
    .required('A data de término é obrigatória.'),
  responsavel: Yup.string() // Alterado para string simples (email do gestor)
    .required('O nome do responsável é obrigatório.'), // Mensagem de erro mantida
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
    // NOVO: Default values para os novos campos
    defaultValues: {
      titulo: '',
      descricao: '',
      inicio: '', // NOVO
      termino: '', // NOVO
      responsavel: '', // Valor inicial vazio para o select
    }
  });
  
    const onSubmit = async (data) => {
    try {
      // Usando 'inicio' e 'termino' da validação, e adicionando 'periodo' no formato que a API pode esperar, 
      // ou removendo 'periodo' (assumo que 'periodo' no seu json-server é o campo de início).
      // Se 'periodo' for a data de início:
      const metaData = { 
        ...data, 
        periodo: data.inicio, // Mapeia 'inicio' para 'periodo' (se for o caso)
        status: 'Pendente' 
      };
      
      // Ajuste: O form estava pegando 4 campos, mas 'periodo' era usado para dois. 
      // Vou passar 'inicio' e 'termino' explicitamente, e remover 'periodo' dos inputs HTML.
      // E remover 'periodo' dos campos do yup. A meta na store só precisa do que a API aceita.
      
      // Enviando todos os campos validados
      const { inicio, termino, ...rest } = data; // Separando inicio e termino
      await dispatch(addNewMeta({ ...rest, inicio, termino, status: 'Pendente' })).unwrap();

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
            <label htmlFor="inicio">Data de Início</label>
            <input // Alterado id de 'inicio' para 'inicio' e usando 'inicio' no register
              type="date"
              id="inicio"
              placeholder="Escolha uma data para início"
              {...register("inicio")} 
            />
            {errors.inicio && <p className="error-message">{errors.inicio.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="termino">Data de Término</label>
            <input // Alterado id de 'inicio' para 'termino' e usando 'termino' no register
              type="date"
              id="termino"
              placeholder="Escolha uma data para término"
              {...register("termino")} 
            />
            {errors.termino && <p className="error-message">{errors.termino.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="responsavel">Responsável</label>
            <select // NOVO: Usando <select> para o responsável
              id="responsavel"
              {...register("responsavel")} 
            >
              <option value="">Selecione um funcionário...</option>
              {responsavelOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.responsavel && <p className="error-message">{errors.responsavel.message}</p>}
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