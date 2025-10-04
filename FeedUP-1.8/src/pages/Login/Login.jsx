import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./loginstyle.module.css";
import ButtonSubmit from "../../Components/ButtonSubmit.jsx";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../features/user/loginSlice";
import { selectAllUsers } from "../../features/user/usersSlice";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector(selectAllUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    const foundUser = userList.find(user => 
      (user.email === identifier || user.cpf === identifier)
    );
    if (foundUser && foundUser.senha === senha) {
      dispatch(loginSuccess(foundUser));
      alert(`Bem-vindo, ${foundUser.nome}!`);
      navigate("/home");
    } else {
      const errorMessage = "E-mail/CPF ou senha inválidos.";
      dispatch(loginFailure(errorMessage));
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.loginConteiner} style={{ padding: 24 }}>
      <h1 className="text-teal-400 text-3xl mb-8 font-bold text-center">
        Bem-vindo ao FeedUp!
      </h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="login">E-mail ou CPF</label>
        <input
          id="login"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        <ButtonSubmit texto="Entrar" />

        <div style={{ marginTop: 12 }}>
          <Link to="/criar-conta" className={styles.forgot}>
            Novo aqui? Criar conta
          </Link>
        </div>
      </form>
    </div>
  );
}