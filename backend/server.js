const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
// Evita conflito com json-server (muita gente roda ele em 3001)
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Conexão com o MongoDB Atlas estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Falha ao conectar no MongoDB:", err.message);
  });

app.get("/", (_req, res) => {
    res.send("Olá! O seu backend FeedUp está no ar!");
  });

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const metasRouter = require("./routes/metas");
app.use("/metas", metasRouter);

const ciclosRouter = require("./routes/ciclos");
app.use("/ciclos", ciclosRouter);

const avaliacoesRouter = require("./routes/avaliacoes");
app.use("/avaliacoes", avaliacoesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor back-end rodando na porta ${PORT}`);
});
