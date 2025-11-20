import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./features/user/usersSlice";
import Login from "./pages/Login/Login.jsx";
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
import FazerAvaliacao from "./pages/FazerAvaliacao/FazerAvaliacao.jsx";
import EditarPerfil from "./pages/VisualizarPerfil/EditarPerfil.jsx";
import RegistroAtividades from "./pages/RegistroAtividades/RegistroAtividades.jsx";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);
  if (userStatus === "loading") {
    return <div>Carregando dados dos usuários...</div>;
  }
  if (userStatus === "failed") {
    return (
      <div>
        Falha ao carregar dados. Verifique se o json-server está rodando.
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
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
      <Route path="/fazer-avaliacao/:id" element={<FazerAvaliacao />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/ciclo-revisao" element={<CicloRevisao />} />
      <Route path="/editar-meta/:id" element={<Metas />} />
      <Route path="/perfil" element={<CriarConta />} />
      <Route path="/perfil/editar" element={<EditarPerfil />} />
      <Route path="/registro-atividades" element={<RegistroAtividades />} />
    </Routes>
  );
}

export default App;
