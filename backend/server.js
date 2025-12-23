const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware primeiro
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://front-a7ua.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    // permite requests sem origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// MUITO IMPORTANTE: responder preflight
app.options("/", cors());


// Mongo
const uri = process.env.DATABASE_URL;

mongoose
  .connect(uri)
  .then(() => console.log("Conexão com o MongoDB Atlas estabelecida com sucesso!"))
  .catch((err) => console.error("Falha ao conectar no MongoDB:", err.message));

// Rotas
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

// Listen só UMA vez, no final
app.listen(PORT, () => {
  console.log(`🚀 Servidor back-end rodando na porta ${PORT}`);
});
