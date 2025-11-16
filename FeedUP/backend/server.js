const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Conexão com o MongoDB Atlas estabelecida com sucesso!");
});

app.get('/', (req, res) => {
  res.send('Olá! O seu backend FeedUp está no ar!');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter); 

const metasRouter = require('./routes/metas');
app.use('/metas', metasRouter);



app.listen(PORT, () => {

});