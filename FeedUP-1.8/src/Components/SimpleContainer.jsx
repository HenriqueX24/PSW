import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styles from "./SimpleContainer.module.css";

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
