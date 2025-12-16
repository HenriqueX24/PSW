// AvaliacaoSnapshotModal.jsx
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define o Dialog (Modal) estilizado usando a API do Material-UI
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Função auxiliar interna para formatar a resposta de uma questão
 * para exibição amigável no snapshot.
 *
 * @param {string | number} resposta - O valor salvo da resposta.
 * @param {object} questao - O objeto da questão (para obter contexto, como opções ou labels).
 * @returns {string} A resposta formatada.
 */
const formatResposta = (resposta, questao) => {
  if (questao.tipo === 'slider') {
    return `Valor: ${resposta} (Min: ${questao.slider.labelMin}, Max: ${questao.slider.labelMax})`;
  } else if (questao.tipo === 'multipla_escolha') {
    // Tenta encontrar o texto da opção baseada no ID (se a resposta for o ID da opção)
    const opcaoSelecionada = questao.opcoes.find(opt => String(opt.id) === String(resposta));
    return opcaoSelecionada ? `Opção Selecionada: "${opcaoSelecionada.texto}"` : `Resposta Salva: ${resposta}`;
  }
  // Para outros tipos (como texto) ou respostas vazias
  return resposta || "Sem Resposta Salva";
};


/**
 * Componente Modal (Dialog) que exibe um "snapshot" (resumo)
 * de uma avaliação já respondida.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.open - Controla se o modal está visível.
 * @param {function} props.handleClose - Função chamada para fechar o modal.
 * @param {object} props.avaliacao - O objeto de avaliação completo (com { dados: { titulo, dataResposta, questoes, respostas, status } }).
 * @returns {JSX.Element | null} O modal ou nulo se não houver avaliação.
 */
export default function AvaliacaoSnapshotModal({ open, handleClose, avaliacao }) {
  
  if (!avaliacao) {
    return null; 
  }

  const { titulo, dataResposta, questoes, respostas, status } = avaliacao.dados;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="avaliacao-snapshot-dialog-title"
      open={open}
      fullWidth 
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="avaliacao-snapshot-dialog-title">
        Snapshot da Avaliação: **{titulo}**
      </DialogTitle>
      {/* Botão de Fechar (X) no canto */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {/* Seção de Metadados da Avaliação */}
        <Typography variant="subtitle1" gutterBottom>
          **Status**: {status}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{mb: 2}}>
          **Respondida em**: {dataResposta ? new Date(dataResposta).toLocaleString() : 'N/A'}
        </Typography>
        
        <Typography variant="h6" sx={{mt: 3, mb: 1, borderBottom: '1px solid #eee'}}>
          Respostas
        </Typography>

        {/* Mapeia e exibe cada questão e sua respectiva resposta */}
        {questoes.map((questao, index) => {
          const idQuestao = String(questao.id);
          const resposta = respostas ? respostas[idQuestao] : null;
          
          return (
            <Box key={questao.id} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {index + 1}. {questao.enunciado}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ ml: 2, p: 1, borderLeft: '3px solid', borderColor: 'primary.main', backgroundColor: 'action.hover' }}
              >
                {/* Usa a função auxiliar para formatar a resposta */}
                {formatResposta(resposta, questao)}
              </Typography>
            </Box>
          );
        })}
        
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Fechar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
