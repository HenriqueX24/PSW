// OpcoesMultiplaEscolha.jsx
import React from 'react';
import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

function OpcoesMultiplaEscolha({ questao, atualizarQuestao }) {
    const { id, opcoes } = questao;

    const handleOpcaoChange = (index, novoTexto) => {
        const novasOpcoes = opcoes.map((opcao, i) =>
            i === index ? { ...opcao, texto: novoTexto } : opcao
        );
        atualizarQuestao(id, { opcoes: novasOpcoes });
    };

    return (
        <RadioGroup>
            {opcoes.map((opcao, index) => (
                <Box key={opcao.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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