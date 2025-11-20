// OpcoesMultiplaEscolha.jsx
import React from "react";
import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

/**
 * Componente "filho" para `CardQuestao`.
 * Renderiza os campos de texto para definir as opções de uma
 * questão de "Múltipla Escolha" no formulário de criação de avaliação.
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.questao - O objeto da questão (contendo { id, opcoes }).
 * @param {function} props.atualizarQuestao - Callback (id, updates) para atualizar o estado no componente pai.
 * @returns {JSX.Element} Os campos de input para as opções.
 */
function OpcoesMultiplaEscolha({ questao, atualizarQuestao }) {
  const { id, opcoes } = questao;

  // Handler para atualizar o texto de uma opção específica
  const handleOpcaoChange = (index, novoTexto) => {
    // Cria um novo array de opções com o texto atualizado
    const novasOpcoes = opcoes.map((opcao, i) =>
      i === index ? { ...opcao, texto: novoTexto } : opcao
    );
    // Chama a função do pai para salvar a mudança
    atualizarQuestao(id, { opcoes: novasOpcoes });
  };

  return (
    <RadioGroup>
      {opcoes.map((opcao, index) => (
        <Box
          key={opcao.id}
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          {/* O Radio button é desabilitado (apenas visual) */}
          <FormControlLabel
            value={`opcao-${index}`}
            control={<Radio disabled />}
            label={`Opção ${index + 1}`}
            sx={{ mr: 1 }}
          />
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={`Texto da Opção ${index + 1}`}
            value={opcao.texto}
            onChange={(e) => handleOpcaoChange(index, e.target.value)}
            required
          />
        </Box>
      ))}
    </RadioGroup>
  );
}

export default OpcoesMultiplaEscolha;
