import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Divider, RadioGroup, FormControlLabel, Radio, Slider } from '@mui/material';

export default function FormsAvaliacao({ avaliacao, onRespostasChange }) {
  
  if (!avaliacao || !avaliacao.questoes) {
    return <Typography variant="h6">Avaliação não encontrada ou em formato inválido.</Typography>;
  }

  const { titulo, questoes } = avaliacao;
  const [respostas, setRespostas] = useState({});

  const handleRespostaChange = (idQuestao, valor) => {
    setRespostas(prev => ({
      ...prev,
      [String(idQuestao)]: valor
    }));
  };
  
  // Notifica o componente pai sobre as respostas atuais
  useEffect(() => {
      if (onRespostasChange) {
          onRespostasChange(respostas);
      }
  }, [respostas, onRespostasChange]);

  const renderQuestaoInput = (questao) => {
      const valorAtual = respostas[questao.id] || (questao.tipo === 'slider' ? (questao.slider?.min || 0) : '');

      switch (questao.tipo) {
          case 'slider':
              // Lógica de renderização do Slider...
              return (
                  <Box sx={{ mt: 2, px: 2 }}>
                      <Slider
                          value={Number(valorAtual)}
                          onChange={(e, newValue) => handleRespostaChange(questao.id, newValue)}
                          aria-labelledby={`slider-label-${questao.id}`}
                          valueLabelDisplay="auto"
                          step={questao.slider?.step || 1}
                          marks
                          min={questao.slider?.min || 0}
                          max={questao.slider?.max || 10}
                      />
                  </Box>
              );
          case 'multipla_escolha':
              // Lógica de renderização de Múltipla Escolha...
              return (
                  <RadioGroup
                      aria-label={`questao-${questao.id}`}
                      name={`questao-${questao.id}`}
                      value={valorAtual} 
                      onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                      sx={{ mt: 1, ml: 2 }}
                  >
                      {questao.opcoes?.map((opcao) => (
                          <FormControlLabel 
                              key={opcao.id} 
                              value={opcao.texto}
                              control={<Radio />} 
                              label={opcao.texto || 'Opção Vazia'} 
                          />
                      ))}
                  </RadioGroup>
              );
          default:
              return (
                  <TextField
                      fullWidth
                      label="Resposta (Texto Livre)"
                      variant="outlined"
                      margin="normal"
                      value={valorAtual}
                      onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                  />
              );
      }
  }

  return (
    <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {titulo}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {questoes.length > 0 ? (
        questoes.map((questao, index) => (
          <Box key={questao.id} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              {index + 1}. {questao.enunciado || `Questão ${index + 1} (Sem Enunciado)`}
            </Typography>
            {renderQuestaoInput(questao)}
          </Box>
        ))
      ) : (
        <Typography>Nenhuma questão disponível para esta avaliação.</Typography>
      )}
    </Box>
  );
}