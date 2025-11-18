const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  cargo: { type: String, required: true },
  senha: {
    type: String,
    required: true,
    select: false 
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {

  if (!this.isModified('senha')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.senha);
};

const User = mongoose.model('User', userSchema);

module.exports = User;