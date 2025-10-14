// src/Components/Forms.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { addNewUser, updateUser } from '../features/user/usersSlice';

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Input } from '@mui/material';
import ButtonSubmit from "./ButtonSubmit";
import styles from "./Forms.module.css";


const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().when('$isEditMode', {
    is: false,
    then: schema => schema.min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    otherwise: schema => schema.optional(),
  }),
  cargo: Yup.string().required('Perfil é obrigatório'),
});

export default function Forms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.pathname.includes('/perfil/editar');
  const { currentUser } = useSelector(state => state.login);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    context: { isEditMode }, 
    defaultValues: isEditMode ? currentUser : { cargo: 'funcionario' }
  });

  const handleCpfChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    setValue('cpf', v, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(updateUser({ ...currentUser, ...data })).unwrap();
        alert('Perfil atualizado com sucesso!');
        navigate('/perfil');
      } else {
        await dispatch(addNewUser(data)).unwrap();
        alert('Conta criada com sucesso!');
        navigate('/login');
      }
    } catch (err) {
      alert('Ocorreu uma falha.');
      console.error('Falha ao salvar:', err);
    }
  };

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
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>
      
      {!isEditMode && (
        <div className="form-group">
          <label>Senha</label>
          <Input fullWidth type="password" {...register("senha")} />
          {errors.senha && <p className="error-message">{errors.senha.message}</p>}
        </div>
      )}

      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel component="legend" style={{ fontWeight: 600, color: "#333" }}>Perfil</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="funcionario" control={<Radio {...register("cargo")} />} label="Funcionário" />
          <FormControlLabel value="gestor" control={<Radio {...register("cargo")} />} label="Gestor" />
        </RadioGroup>
      </FormControl>

      <ButtonSubmit texto={isEditMode ? 'Salvar Alterações' : 'Criar Conta'} disabled={isSubmitting} />
    </form>
  );
}