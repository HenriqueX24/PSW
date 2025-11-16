
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  periodo: { type: String, required: true },
  responsavel: { type: String, required: true },
  status: { type: String, required: true, default: 'Pendente' },
  
}, { timestamps: true });

const Meta = mongoose.model('Meta', metaSchema);

module.exports = Meta;