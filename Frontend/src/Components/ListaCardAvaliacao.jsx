import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import {
  selectAllAvaliacoes,
  fetchAvaliacoes,
} from "../features/user/avaliacaoSlice"; // Certifique-se de que o caminho está correto
import CardAvaliacao from "./CardAvaliacao"; 
import { Typography, Box } from "@mui/material"; 
import { Link } from "react-router-dom"; // Importa Link para navegação

const ListaCardAvaliacao = () => {
  const dispatch = useDispatch();
  // Busca as avaliações e o status
  // O erro 'reading ids' é resolvido se o Redux Store estiver configurado corretamente
  const avaliacoes = useSelector(selectAllAvaliacoes); 
  const avaliacoesStatus = useSelector((state) => state.avaliacoes.status); // <--- O nome 'avaliacoes' DEVE coincidir com o nome no Redux Store
  const error = useSelector((state) => state.avaliacoes.error);

  // Efeito para carregar as avaliações quando o componente for montado (se necessário)
  useEffect(() => {
    if (avaliacoesStatus === "idle") {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacoesStatus, dispatch]);

  const formatarData = (dataString) => {
    try {
        if (dataString) {
            return new Date(dataString).toLocaleDateString('pt-BR');
        }
    } catch (e) {
        return "Data Inválida";
    }
    return "Data Desconhecida"; 
  };

  let content;

  if (avaliacoesStatus === "loading") {
    content = <Typography sx={{ p: 2 }}>Carregando avaliações...</Typography>;
  } else if (avaliacoesStatus === "succeeded") {
    
    if (avaliacoes.length === 0) {
         content = <Typography sx={{ p: 2 }}>Nenhuma avaliação disponível. Crie uma nova!</Typography>;
    } else {
        // Mapeia os dados do Redux para os cards
        content = avaliacoes.map((avaliacao) => (
            // CardAvaliacao deve usar Link (ou um wrapper que usa Link) para a navegação
            <CardAvaliacao
                key={avaliacao.id}
                titulo={avaliacao.titulo}
                data={formatarData(avaliacao.dataCriacao)} 
                // O link agora aponta para a rota de preenchimento, usando o ID real
                link={`/fazer-avaliacao/${avaliacao.id}`} 
            />
        ));
    }
  } else if (avaliacoesStatus === "failed") {
    content = <Typography color="error" sx={{ p: 2 }}>Erro ao carregar avaliações: {error}. Verifique a API.</Typography>;
  }

  return (
    <div className="lista-avaliacoes">
      {/* Removemos os cards estáticos para usar o conteúdo dinâmico do Redux */}
      {content}
    </div>
  );
};

export default ListaCardAvaliacao;