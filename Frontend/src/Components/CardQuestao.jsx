import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import OpcoesMultiplaEscolha from "./OpcoesMultiplaEscolha"; 
import OpcaoSlider from "./OpcaoSlider"; 

/**
 * Componente Card para *construir* ou *editar* uma questão dentro
 * do formulário de criação de avaliação.
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.questao - O objeto da questão (com { id, enunciado, tipo, ... }).
 * @param {number} props.index - O índice numérico da questão (para "Questão #1").
 * @param {function} props.atualizarQuestao - Callback (id, updates) para atualizar o estado da questão no componente pai.
 * @param {function} props.removerQuestao - Callback (id) para remover a questão no componente pai.
 * @returns {JSX.Element} O card de edição da questão.
 */
function CardQuestao({ questao, index, atualizarQuestao, removerQuestao }) {
  const { id, enunciado, tipo } = questao;

  // Handler para mudar o tipo da questão (ex: de Slider para Múltipla Escolha)
  const handleTipoChange = (event) => {
    // Chama a função do pai para atualizar o estado
    atualizarQuestao(id, { tipo: event.target.value });
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardContent>
        {/* Cabeçalho do Card da Questão (Título e Botão de Remover) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Questão #{index + 1}
          </Typography>
          <IconButton
            aria-label="remover questão"
            onClick={() => removerQuestao(id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Campo para o Enunciado da Questão */}
        <TextField
          fullWidth
          label="Enunciado da Questão"
          variant="outlined"
          multiline
          rows={2}
          value={enunciado}
          onChange={(e) => atualizarQuestao(id, { enunciado: e.target.value })}
          margin="normal"
          required
        />

        {/* Seleção de Tipo de Questão */}
        <FormControl fullWidth margin="normal">
          <InputLabel id={`select-tipo-${id}`}>Tipo de Resposta</InputLabel>
          <Select
            labelId={`select-tipo-${id}`}
            id={`select-tipo-${id}`}
            value={tipo}
            label="Tipo de Resposta"
            onChange={handleTipoChange}
          >
            <MenuItem value="multipla_escolha">
              Múltipla Escolha (4 Alternativas)
            </MenuItem>
            <MenuItem value="slider">Slider (Escala)</MenuItem>
          </Select>
        </FormControl>

        {/* Componente Dinâmico do Tipo de Resposta */}
        <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Configuração da Resposta:
          </Typography>
          {/* Renderiza o componente de configuração apropriado baseado no 'tipo' */}
          {tipo === "multipla_escolha" ? (
            <OpcoesMultiplaEscolha
              questao={questao}
              atualizarQuestao={atualizarQuestao}
            />
          ) : (
            <OpcaoSlider
              questao={questao}
              atualizarQuestao={atualizarQuestao}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
export default CardQuestao;
