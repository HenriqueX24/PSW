// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Perfil from './Perfil.jsx'
import Metas from './Metas.jsx'
import MetaDetalhe from './MetaDetalhe.jsx'
import CriarMeta from './CriarMeta.jsx'
import CriarConta from './CriarConta.jsx'
import CriarCiclo from './CriarCiclo.jsx'
import CriarAvaliacao from './CriarAvaliacao.jsx'
import CicloRevisao from './CicloRevisao.jsx' 
import CicloFuncionarios from './CicloFuncionarios.jsx'
import Avaliacao from './Avaliacao.jsx'
import AutoAvaliacao from './AutoAvaliacao.jsx'



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
        <Route path="/auto-avaliacao/:id" element={<AutoAvaliacao />} />  
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
