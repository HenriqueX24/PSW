const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cicloSchema = new Schema({
  titulo: { 
    type: String, 
    required: true, 
    trim: true 
  },
  dataInicio: { 
    type: Date, 
    required: true 
  },
  dataFim: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pendente', 'Em Andamento', 'Concluído'], 
    default: 'Pendente' 
  },
  
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
}, {
  timestamps: true, 
});

const Ciclo = mongoose.model('Ciclo', cicloSchema);

module.exports = Ciclo;