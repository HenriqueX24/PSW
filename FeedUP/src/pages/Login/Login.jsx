import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./loginstyle.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../features/user/loginSlice.js";
import { selectAllUsers } from "../../features/user/usersSlice.js";
import { Box, Container, Typography } from "@mui/material";
import ButtonSubmit from "../../Components/ButtonSubmit.jsx";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector(selectAllUsers);

  console.log("Usuários disponíveis para login:", userList);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    const foundUser = userList.find(
      (user) => user.email === identifier || user.cpf === identifier
    );
    if (foundUser && foundUser.senha === senha) {
      dispatch(loginSuccess(foundUser));
      alert(`Bem-vindo, ${foundUser.nome}!`);
      navigate("/ciclo-revisao");
    } else {
      const errorMessage = "E-mail/CPF ou senha inválidos.";
      dispatch(loginFailure(errorMessage));
      alert(errorMessage);
    }
  };

  return (
    <>
      <Box
        fullWidth
        margin="normal"
        sx={{
          borderStyle: "solid",
          borderColor: "grey.400",
          borderWidth: 1,
          display: "flex",
          border: "1px grey",
          borderRadius: 1,
          boxShadow: 5,
          backgroundColor: "white",
          flexGrow: 5,
        }}
      >
        <Container className={styles.loginPageWrapper} maxWidth={"xs"}>
          <div className={styles.loginContainer}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: "#2dd4bf",
                mb: 4,
                fontWeight: "bold",
              }}
            >
              Bem-vindo ao FeedUp!
            </Typography>
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
        </Container>
      </Box>
    </>
  );
}
