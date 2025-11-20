import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styles from "./SimpleContainer.module.css";

/**
 * Um contêiner de layout simples (wrapper).
 *
 * Usa o `Container` e `Box` do Material-UI para centralizar
 * o conteúdo (`children`) verticalmente e horizontalmente,
 * com um fundo branco e altura definida.
 *
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos a serem renderizados dentro do contêiner.
 * @returns {JSX.Element} O contêiner de layout.
 */
function SimpleContainer({ children }) {
  return (
    <Container
      maxWidth="lg"
      className={styles.loginContainer}
      sx={{ bgcolor: "#ffff", height: "105vh", minWidth: "300px" }}
    >
      <Box
        sx={{
          bgcolor: "#ffff",
          height: "100vh",
          paddingTop: "40px",
          paddingBottom: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "top",
          minWidth: "500px",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default SimpleContainer;
