// src/CriarCiclo.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addNewCiclo } from "../../features/user/ciclosSlice";
import "./criar-ciclo.css";
import NavBar from "../../Components/NavBar";
import { selectAllUsers } from "../../features/user/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAvaliacoes, selectAllAvaliacoes } from "../../features/user/avaliacaoSlice";
import Title from "../../Components/Title";
import { Container, Box, Chip, Stack } from "@mui/material";
import SelectUsers from "../../Components/SelectUsers";

// Esquema de validação do formulário com Yup
const validationSchema = Yup.object().shape({
  titulo: Yup.string().required("Título é obrigatório"),
  tipo: Yup.string().required("Tipo de ciclo é obrigatório"),
  inicio: Yup.string().required("Data de início é obrigatória"),
  termino: Yup.string().required("Data de término é obrigatória"),
  // Ambos, Avaliadores e Avaliados, são arrays de emails
  avaliadores: Yup.array().min(1, "Selecione ao menos um avaliador").required(),
  avaliados: Yup.array().min(1, "Selecione ao menos um avaliado").required(),
  avaliacaoTemplateId: Yup.string().required("Selecione um template de avaliação"),
});

/**
 * Página "Criar Ciclo".
 *
 * Renderiza um formulário completo para a criação de um novo Ciclo de Revisão.
 * Utiliza `react-hook-form` e `yup` para gerenciamento e validação.
 * Permite selecionar 'Avaliadores' (Gestores) e 'Avaliados' (Funcionários)
 * a partir de dados do Redux.
 * Despacha a ação `addNewCiclo` do Redux ao submeter.
 *
 * @returns {JSX.Element} A página de criação de ciclo.
 */
export default function CriarCiclo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(selectAllUsers);
  const avaliacoes = useSelector(selectAllAvaliacoes);
  const avaliacoesStatus = useSelector((state) => state.avaliacoes.status);

  useEffect(() => {
    if (avaliacoesStatus === "idle") {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacoesStatus, dispatch]);


  // Listas filtradas por cargo
  const gestoresList = userList.filter((user) => user.cargo === "gestor");
  const funcionariosList = userList.filter(
    (user) => user.cargo === "funcionario"
  );

  // Estados locais para controlar o seletor e permitir o reset
  const [selectedAvaliadoEmail, setSelectedAvaliadoEmail] = useState("");
  const [selectedAvaliadorEmail, setSelectedAvaliadorEmail] = useState("");

  // Prepara as opções no formato {label: nome, value: email}
  const avaliadosOptions = funcionariosList.map((user) => ({
    label: user.nome,
    value: user.email,
  }));

  const avaliadoresOptions = gestoresList.map((user) => ({
    label: user.nome,
    value: user.email,
  }));

  // Configuração do React Hook Form
  const {
    handleSubmit,
    setValue, // Usado para atualizar o valor do formulário programaticamente
    watch, // Usado para observar os valores dos arrays
    register, // Mantido para campos simples
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avaliadores: [], // Array de emails de gestores
      avaliados: [], // Array de emails de funcionários
    },
  });

  // Observa os arrays de emails selecionados no estado do formulário
  const avaliados = watch("avaliados");
  const avaliadores = watch("avaliadores");

  // Função auxiliar para obter o nome do usuário a partir do email para o label do Chip
  const getUsernameByEmail = (email) => {
    const user = userList.find((u) => u.email === email);
    return user ? user.nome : email;
  };

  // Lógica para Avaliados (Funcionários)
  const handleAvaliadoSelect = (newEmail) => {
    // Adiciona o email ao array se ele não existir
    if (newEmail && !avaliados.includes(newEmail)) {
      setValue("avaliados", [...avaliados, newEmail], { shouldValidate: true });
    }
    setSelectedAvaliadoEmail(""); // Reseta o seletor
  };

  const handleDeleteAvaliado = (emailToDelete) => {
    // Remove o email do array (Chip)
    const newAvaliados = avaliados.filter((email) => email !== emailToDelete);
    setValue("avaliados", newAvaliados, { shouldValidate: true });
  };

  // Lógica para Avaliadores (Gestores)
  const handleAvaliadorSelect = (newEmail) => {
    if (newEmail && !avaliadores.includes(newEmail)) {
      setValue("avaliadores", [...avaliadores, newEmail], {
        shouldValidate: true,
      });
    }
    setSelectedAvaliadorEmail("");
  };

  const handleDeleteAvaliador = (emailToDelete) => {
    const newAvaliadores = avaliadores.filter(
      (email) => email !== emailToDelete
    );
    setValue("avaliadores", newAvaliadores, { shouldValidate: true });
  };

  // Função de submissão do formulário
  const onSubmit = async (data) => {
    // Monta o objeto com os nomes de campos esperados pelo backend
    const cicloPayload = {
      titulo: data.titulo,
      dataInicio: data.inicio, // converte nome
      dataFim: data.termino, // converte nome
      avaliadores: data.avaliadores,
      avaliados: data.avaliados,
      avaliacaoTemplateId: data.avaliacaoTemplateId,
    };
    try {
      await dispatch(addNewCiclo(cicloPayload)).unwrap();
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
        className="cabecalho"
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
          className="botao-voltar"
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
        <Title className="titulo-pagina" titulo={"Criar Ciclo"} />
      </Container>

      <main className="form-container">
        <form className="ciclo-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Título do Ciclo de Revisão</label>
            <input
              {...register("titulo")}
              placeholder="Ex: Ciclo do Departamento de Marketing"
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

          {/* Template de Avaliação (criado pelo gestor) */}
          <div className="form-group">
            <label>Template de Avaliação</label>
            <select {...register("avaliacaoTemplateId")}>
              <option value="">Selecione...</option>
              {avaliacoes.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.titulo}
                </option>
              ))}
            </select>
            {errors.avaliacaoTemplateId && (
              <p className="error-message">{errors.avaliacaoTemplateId.message}</p>
            )}
          </div>


          {/* Seção de Avaliadores (Gestores) com Seletor e Chips */}
          <div className="form-group">
            <label>Avaliador</label>
            <SelectUsers
              options={avaliadoresOptions}
              value={selectedAvaliadorEmail}
              onChange={handleAvaliadorSelect}
              selectLabel="Adicionar Avaliador"
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
            >
              {avaliadores.map((email) => (
                <Chip
                  key={email}
                  label={getUsernameByEmail(email)}
                  onDelete={() => handleDeleteAvaliador(email)}
                  color="secondary" // Cor diferente para distinção
                  variant="outlined"
                />
              ))}
            </Stack>

            {errors.avaliadores && (
              <p className="error-message">{errors.avaliadores.message}</p>
            )}
          </div>

          {/* Seção de Avaliados (Funcionários) com Seletor e Chips */}
          <div className="form-group">
            <label>Avaliados</label>
            <SelectUsers
              options={avaliadosOptions}
              value={selectedAvaliadoEmail}
              onChange={handleAvaliadoSelect}
              selectLabel="Adicionar Avaliado"
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
            >
              {avaliados.map((email) => (
                <Chip
                  key={email}
                  label={getUsernameByEmail(email)}
                  onDelete={() => handleDeleteAvaliado(email)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>

            {errors.avaliados && (
              <p className="error-message">{errors.avaliados.message}</p>
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