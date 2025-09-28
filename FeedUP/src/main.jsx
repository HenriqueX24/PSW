// src/main.jsx
import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
