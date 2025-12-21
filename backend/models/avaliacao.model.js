const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Subschema para opções das questões
const OpcaoSchema = new Schema(
  {
    id: { type: Number, required: true },
    texto: { type: String, default: "" },
  },
  { _id: false }
);

// Subschema para slider das questões
const SliderSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    step: { type: Number, required: true },
    labelMin: { type: String, required: true },
    labelMax: { type: String, required: true },
  },
  { _id: false }
);

// Subschema para questões
const QuestaoSchema = new Schema(
  {
    id: { type: Number, required: true },
    enunciado: { type: String, required: true },
    tipo: { type: String, required: true }, // "multipla_escolha" ou "slider"
    opcoes: [OpcaoSchema],
    slider: SliderSchema,
  },
  { _id: false }
);

const avaliacaoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {},
    opcoes: {},
    questoes: [QuestaoSchema],
    respostas: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {}
    },
    status: {
      type: String,
      default: "Pendente"
    },
    dataCriacao: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dataResposta: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Avaliacao = mongoose.model("Avaliacao", avaliacaoSchema);

module.exports = Avaliacao;
