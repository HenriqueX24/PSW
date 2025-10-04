import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/user/usersSlice'
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Perfil from "./pages/VisualizarPerfil/Perfil.jsx";
import Metas from "./pages/Metas/Metas.jsx";
import MetaDetalhe from "./pages/Meta-detalhe/MetaDetalhe.jsx";
import CriarMeta from "./pages/CriarMeta/CriarMeta.jsx";
import CriarConta from "./pages/CriarConta/CriarConta.jsx";
import CriarCiclo from "./pages/CriaCicloRevisao/CriarCiclo.jsx";
import CriarAvaliacao from "./pages/CriarAvaliacao/CriarAvaliacao.jsx";
import CicloRevisao from "./pages/CicloRevisao/CicloRevisao.jsx";
import CicloFuncionarios from "./pages/CicloFuncionarios/CicloFuncionarios.jsx";
import Avaliacao from "./pages/Avaliacao/Avaliacao.jsx";
import Autoavaliacao from "./pages/Autoavaliacao/Autoavaliacao.jsx";
import CriarAutoavalicao from "./pages/CriarAutoavaliacao/CriarAutoavalicao.jsx";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.users.status);
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);
  if (userStatus === 'loading') {
    return <div>Carregando dados dos usuários...</div>;
  }
  if (userStatus === 'failed') {
    return <div>Falha ao carregar dados. Verifique se o json-server está rodando.</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/meta-detalhe/:id" element={<MetaDetalhe />} />
      <Route path="/criar-meta" element={<CriarMeta />} />
      <Route path="/criar-conta" element={<CriarConta />} />
      <Route path="/criar-ciclo" element={<CriarCiclo />} />
      <Route path="/criar-avaliacao" element={<CriarAvaliacao />} />
      <Route path="/ciclo-revisao" element={<CicloRevisao />} />
      <Route path="/ciclo-funcionarios/:id" element={<CicloFuncionarios />} />
      <Route path="/avaliacao/:id" element={<Avaliacao />} />
      <Route path="/auto-avaliacao/:id" element={<Autoavaliacao />} />
      <Route path="/criar-autoavaliacao/" element={<CriarAutoavalicao />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
