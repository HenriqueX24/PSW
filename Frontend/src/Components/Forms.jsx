import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addNewUser, updateUser } from "../features/user/usersSlice";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ButtonSubmit from "./ButtonSubmit";
import styles from "./Forms.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Esquema de validação com Yup
const validationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string().when("$isEditMode", {
    // Validação condicional da senha
    is: false,
    then: (schema) =>
      schema
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    otherwise: (schema) => schema.optional(),
  }),
  cargo: Yup.string().required("Perfil é obrigatório"),
});

/**
 * Componente de formulário para Criar ou Editar um Perfil de Usuário.
 *
 * Utiliza `react-hook-form` para gerenciamento de estado e `yup` para validação.
 * Detecta automaticamente o modo (Criação vs. Edição) com base na URL.
 * Despacha ações do Redux (`addNewUser` ou `updateUser`) ao submeter.
 *
 * @returns {JSX.Element} O formulário de usuário.
 */
export default function Forms() {
  const [showSenha, setShowSenha] = useState(false); // Estado para mostrar/ocultar senha
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se está em modo de edição pela URL
  const isEditMode = location.pathname.includes("/perfil/editar");
  const { currentUser } = useSelector((state) => state.login);

  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    context: { isEditMode },
    defaultValues: isEditMode
      ? currentUser?.user || currentUser : { cargo: "funcionario" }, // Define valores padrão
  });

  // Máscara para o campo de CPF
  const handleCpfChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9)
      v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    else if (v.length > 6)
      v = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    setValue("cpf", v, { shouldValidate: true });
  };

  // Alterna a visibilidade da senha
  const handleClickShowSenha = () => {
    setShowSenha((show) => !show);
  };

  // Função de submit 
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Lógica de edição
        const userToEdit = currentUser?.user || currentUser;
        await dispatch(updateUser({ ...userToEdit, ...data })).unwrap();
        alert("Perfil atualizado com sucesso!");
        navigate("/perfil");
      } else {
        // Lógica de criação
        await dispatch(addNewUser(data)).unwrap();
        alert("Conta criada com sucesso!");
        navigate("/login");
      }
    } catch (err) {
      alert("Ocorreu uma falha ao salvar os dados.");
      console.error("Falha ao salvar:", err);
    }
  };

  // Renderização do formulário
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className="form-group">
        <label>Nome completo</label>
        <Input fullWidth {...register("nome")} />
        {errors.nome && <p className="error-message">{errors.nome.message}</p>}
      </div>

      <div className="form-group">
        <label>CPF</label>
        <Input fullWidth {...register("cpf")} onChange={handleCpfChange} />
        {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <Input fullWidth type="email" {...register("email")} />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      {/* Campo de senha só aparece no modo de criação */}
      {!isEditMode && (
        <div className="form-group">
          <label>Senha</label>
          <Input
            fullWidth
            type={showSenha ? "text" : "password"} // Alterna o tipo
            {...register("senha")}
            endAdornment={
              // Ícone de visibilidade
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowSenha}
                  edge="end"
                >
                  {showSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.senha && (
            <p className="error-message">{errors.senha.message}</p>
          )}
        </div>
      )}

      {/* Seleção de Cargo (Perfil) */}
      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel
          component="legend"
          style={{ fontWeight: 600, color: "#333" }}
        >
          Perfil
        </FormLabel>
        <RadioGroup row>
          <FormControlLabel
            value="funcionario"
            control={<Radio {...register("cargo")} />}
            label="Funcionário"
          />
          <FormControlLabel
            value="gestor"
            control={<Radio {...register("cargo")} />}
            label="Gestor"
          />
        </RadioGroup>
      </FormControl>

      <ButtonSubmit
        texto={isEditMode ? "Salvar Alterações" : "Criar Conta"}
        disabled={isSubmitting}
      />
    </form>
  );
}
