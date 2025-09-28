import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./loginstyle.module.css";
import Button from "@mui/material/Button";
import ButtonSubmit from "../../Components/ButtonSubmit.jsx";

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
    <div className={styles.loginConteiner} style={{ padding: 24 }}>
      <h1 className="text-teal-400 text-3xl mb-8 font-bold text-center">
        Bem-vindo ao FeedUp!
      </h1>
      {/* Use styles.loginForm (com F maiúsculo) */}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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

        {/* Use styles.btnLogin (com B e L maiúsculos) */}
        <ButtonSubmit />

        <div style={{ marginTop: 12 }}>
          <Link to="/criar-conta" className={styles.forgot}>
            Novo aqui? Criar conta
          </Link>
        </div>
      </form>
    </div>
  );
}
