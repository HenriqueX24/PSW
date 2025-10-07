// src/CriarCiclo.jsximport React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addNewCiclo } from '../../features/user/ciclosSlice';
import "./criar-ciclo.css";
import NavBar from "../../Components/NavBar";
import { selectAllUsers } from '../../features/user/usersSlice'; 
import { useSelector, useDispatch } from 'react-redux'; 


const validationSchema = Yup.object().shape({
  titulo: Yup.string().required('Título é obrigatório'),
  tipo: Yup.string().required('Tipo de ciclo é obrigatório'),
  inicio: Yup.string().required('Data de início é obrigatória'), 
  termino: Yup.string().required('Data de término é obrigatória'), 
  avaliadores: Yup.array().min(1, 'Selecione ao menos um avaliador').required(),
  avaliados: Yup.array().min(1, 'Selecione ao menos um avaliado').required(),
});

export default function CriarCiclo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector(selectAllUsers);
  const gestoresList = userList.filter(user => user.cargo === 'gestor');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { 
      avaliadores: [],
      avaliados: [],
    }
  });

 const onSubmit = async (data) => {
    try {
      await dispatch(addNewCiclo(data)).unwrap();
      
      alert('Ciclo criado com sucesso!');
      navigate('/ciclo-revisao');
    } catch (err) {
      alert('Falha ao criar o ciclo.');
      console.error(err);
    }
  };


  return (
<div className="container">
      <header className="header">
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
        <h1>Criar Ciclo de Revisão</h1>
      </header>
     <main className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Título do Ciclo de Revisão</label>
            <input {...register("titulo")} placeholder="Ex: Avaliação de Desempenho Q1" />
            {errors.titulo && <p className="error-message">{errors.titulo.message}</p>}
          </div>
          <div className="form-group">
            <label>Tipo de Ciclo</label>
            <select {...register("tipo")}>
              <option value="">Selecione...</option>
              <option value="Mensal">Mensal</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
            {errors.tipo && <p className="error-message">{errors.tipo.message}</p>}
          </div>
          <div className="form-group">
            <label>Data de Início</label>
            <input type="date" {...register("inicio")} />
            {errors.inicio && <p className="error-message">{errors.inicio.message}</p>}
          </div>
          <div className="form-group">
            <label>Data de Término</label>
            <input type="date" {...register("termino")} />
            {errors.termino && <p className="error-message">{errors.termino.message}</p>}
          </div>
          
          <div className="form-group">
            <label>Avaliadores</label>
            <div className="checkbox-group">
              {gestoresList.map(user => (
                <label key={user.id}>
                  <input type="checkbox" value={user.email} {...register("avaliadores")} /> 
                  {user.nome}
                </label>
              ))}
            </div>
            {errors.avaliadores && <p className="error-message">{errors.avaliadores.message}</p>}
          </div>

          <div className="form-group">
            <label>Avaliados</label>
            <div className="checkbox-group">
              {userList.map(user => (
                <label key={user.id}>
                  <input type="checkbox" value={user.email} {...register("avaliados")} /> 
                  {user.nome}
                </label>
              ))}
            </div>
            {errors.avaliados && <p className="error-message">{errors.avaliados.message}</p>}
          </div>

          <button type="submit" className="main-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Ciclo'}
          </button>
        </form>
      </main>
      <NavBar />
    </div>
  );
}