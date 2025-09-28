
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CSS/Login/loginstyle.css";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.trim() && senha.trim()) {
      navigate("/home");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="login-container" style={{ padding: 24 }}>
      <h1>Bem-vindo ao FeedUp!</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login">E-mail ou CPF</label>
        <input
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu e-mail ou CPF"
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />

        <button type="submit" className="btn-login">Entrar</button>

        <div style={{ marginTop: 12 }}>
          <Link to="/criar-conta" className="forgot">Novo aqui? Criar conta</Link>
        </div>
      </form>
    </div>
  );
}
