import React from "react";
import "./criar-meta.css"; // use o C/caixa certo aqui
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from '../../Components/NavBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addNewMeta } from "../../features/user/metaSlice";

const validationSchema = Yup.object().shape({
  titulo: Yup.string()
    .required('O título da meta é obrigatório.'),
  descricao: Yup.string()
    .required('A descrição é obrigatória.')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  periodo: Yup.string()
    .required('O período é obrigatório.'),
  responsavel: Yup.string()
    .required('O nome do responsável é obrigatório.'),
});

export default function CriarMeta() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: yupResolver(validationSchema) 
  });
    const onSubmit = async (data) => {
    try {
      await dispatch(addNewMeta({ ...data, status: 'Pendente' })).unwrap();
      alert("Meta salva com sucesso!");
      navigate("/metas");
    } catch (err) {
      console.error('Falha ao salvar a meta: ', err);
      alert("Falha ao salvar a meta.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button
          type="button"
          className="back-btn"
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
        <h1>Criar Meta</h1>
      </header>

      <hr className="divider" />
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
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={3}
              placeholder="Descreva a meta..."
              {...register("descricao")} 
            />
            {errors.descricao && <p className="error-message">{errors.descricao.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <input
              type="text"
              id="periodo"
              placeholder="01/07/2025 - 30/09/2025"
              {...register("periodo")} 
            />
            {errors.periodo && <p className="error-message">{errors.periodo.message}</p>}
          </div>

            <div className="form-group">
            <label htmlFor="responsavel">Responsável</label>
            <input
              type="text"
              id="responsavel"
              placeholder="Nome do responsável"
              {...register("responsavel")} 
            />
            {errors.responsavel && <p className="error-message">{errors.responsavel.message}</p>}
          </div>

          <button type="submit" className="main-btn" disabled={isSubmitting}>
             {isSubmitting ? 'Salvando...' : 'Salvar Meta'}
          </button>
        </form>
      </main>

      {/* Bottom nav fora do <form> */}
      <NavBar />
      
    </div>
  );
}
