import React, { useState } from "react";
import "./CSS/Login/loginstyle.css";

function Login() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login.trim() && senha.trim()) {
            window.location.href = "./home.html";
        } else {
            alert("Preencha todos os campos!");
        }
    };

    return (
        <div className="login-container">
            <h1>Bem-vindo ao FeedUp!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="login">E-mail ou CPF</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="Digite seu e-mail ou CPF"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="submit" className="btn-login">Entrar</button>
                <a href="#" className="forgot">Novo aqui? Toque aqui para criar conta</a>
            </form>
        </div>
    );
}

export default Login;
