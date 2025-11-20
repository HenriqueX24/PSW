import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Divider, RadioGroup, FormControlLabel, Radio, Slider } from '@mui/material';

/**
 * Renderiza o formulário dinâmico para um usuário *responder* a uma avaliação.
 *
 * Ele mapeia as 'questoes' do objeto 'avaliacao' e exibe o input
 * apropriado (Slider, Múltipla Escolha, etc.) para cada uma.
 *
 * @param {object} props - As propriedades do componente.
 * @param {object} props.avaliacao - O objeto de avaliação completo (com { titulo, questoes }).
 * @param {function} props.onRespostasChange - Callback que envia o estado das respostas para o componente pai.
 * @returns {JSX.Element} O formulário de avaliação para preenchimento.
 */
export default function FormsAvaliacao({ avaliacao, onRespostasChange }) {
  
  // Guard Clause: Verifica se a avaliação e as questões existem
  if (!avaliacao || !avaliacao.questoes) {
    return <Typography variant="h6">Avaliação não encontrada ou em formato inválido.</Typography>;
  }

  const { titulo, questoes } = avaliacao;
  // Estado interno para armazenar as respostas (ex: { "questao_id_1": "resposta" })
  const [respostas, setRespostas] = useState({});

  // Handler para atualizar o estado das respostas
  const handleRespostaChange = (idQuestao, valor) => {
    setRespostas(prev => ({
      ...prev,
      [String(idQuestao)]: valor
    }));
  };
  
  // Efeito que notifica o componente pai sempre que as respostas mudarem
  useEffect(() => {
      if (onRespostasChange) {
          onRespostasChange(respostas);
      }
  }, [respostas, onRespostasChange]);

  // Função para renderizar o tipo de input correto (Slider, Radio, etc.)
  const renderQuestaoInput = (questao) => {
      const valorAtual = respostas[questao.id] || (questao.tipo === 'slider' ? (questao.slider?.min || 0) : '');

      switch (questao.tipo) {
          case 'slider':
              // Renderiza um Slider do Material-UI
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
              // Renderiza um grupo de Radio buttons
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
                              value={opcao.texto} // O valor salvo é o texto da opção
                              control={<Radio />} 
                              label={opcao.texto || 'Opção Vazia'} 
                          />
                      ))}
                  </RadioGroup>
              );
          default:
              // Fallback para texto livre
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

  // Renderização principal do formulário
  return (
    <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {titulo}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {questoes.length > 0 ? (
        // Mapeia cada questão e renderiza seu input
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
