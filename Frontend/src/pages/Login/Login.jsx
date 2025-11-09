import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./loginstyle.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../features/user/loginSlice.js";
import { selectAllUsers } from "../../features/user/usersSlice.js";
import { Box, Container, Typography } from "@mui/material";
import ButtonSubmit from "../../Components/ButtonSubmit.jsx";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false); // Novo estado
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

  const handleClickShowSenha = () => { // Nova função
    setShowSenha((show) => !show);
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
              <div style={{ position: 'relative' }}>
              <input
                id="senha"
                // Use o estado showSenha para alternar o tipo
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                style={{ width: '100%', paddingRight: '40px' }} // Ajuste o padding para o ícone
              />
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowSenha}
                  edge="end"
                  // Estilize o botão para aparecer dentro do campo
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {showSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
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
