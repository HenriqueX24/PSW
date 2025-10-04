import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardQuestao from '../../Components/CardQuestao'; // Iremos criar este componente
import ButtonCreate from '../../Components/ButtonCreate';
// import { useDispatch, useSelector } from 'react-redux'; // Preparado para Redux

function CriarAutoavaliacao() {
  // const dispatch = useDispatch(); // Exemplo de uso do Redux
  // const questions = useSelector(state => state.autoavaliacao.questions); // Exemplo de uso do Redux
  
  const [titulo, setTitulo] = useState('');
  const [questoes, setQuestoes] = useState([]);

  // Função para adicionar uma nova questão
  const adicionarQuestao = () => {
    const novaQuestao = {
      id: Date.now(), // ID único para a chave no React
      enunciado: '',
      tipo: 'multipla_escolha', // 'multipla_escolha' ou 'slider'
      opcoes: [{ id: 1, texto: '' }, { id: 2, texto: '' }, { id: 3, texto: '' }, { id: 4, texto: '' }], // Padrão 4 alternativas
      slider: { min: 0, max: 10, step: 1, labelMin: 'Baixo', labelMax: 'Alto' }
    };
    setQuestoes([...questoes, novaQuestao]);
  };

  // Função para remover uma questão
  const removerQuestao = (id) => {
    setQuestoes(questoes.filter(q => q.id !== id));
  };

  // Função para atualizar os dados de uma questão específica
  const atualizarQuestao = (id, novosDados) => {
    setQuestoes(questoes.map(q => 
      q.id === id ? { ...q, ...novosDados } : q
    ));
  };
  
  // Função de submissão do formulário (simulada)
  const handleSubmit = (event) => {
    event.preventDefault();
    const dadosDaAvaliacao = {
      titulo,
      questoes
    };
    console.log('Dados da Avaliação Prontos para o Redux/API:', dadosDaAvaliacao);
    // Em um app Redux, você faria:
    // dispatch(salvarAutoavaliacao(dadosDaAvaliacao)); 
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Autoavaliação
      </Typography>

      <form onSubmit={handleSubmit} className="autoavaliacao-form">
        {/* Campo para o Título da Avaliação */}
        <TextField
          fullWidth
          label="Título da Avaliação"
          variant="outlined"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          margin="normal"
          required
        />
        
        <Divider sx={{ mt: 3, mb: 3 }} />

        {/* Lista de Questões */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {questoes.map((questao, index) => (
            <CardQuestao
              key={questao.id}
              questao={questao}
              index={index}
              atualizarQuestao={atualizarQuestao}
              removerQuestao={removerQuestao}
            />
          ))}
        </Box>

        {/* Botão Adicionar Questão */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <ButtonCreate
            variant="contained"
            onClick={adicionarQuestao}
            startIcon={<AddCircleIcon />}
            sx={{ p: 1.5 }}
            nameButton="Questão"
          > 
          </ButtonCreate>
        </Box>
        
        <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={!titulo || questoes.length === 0}
            >
                Salvar Avaliação
            </Button>
        </Box>
      </form>
    </Container>
  );
}

export default CriarAutoavaliacao;