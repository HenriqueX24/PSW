import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import {
  selectAllAvaliacoes,
  fetchAvaliacoes,
} from "../features/user/avaliacaoSlice"; // Certifique-se de que o caminho está correto
import CardAvaliacao from "./CardAvaliacao"; 
import { Typography, Box } from "@mui/material"; 
import { Link } from "react-router-dom"; // Importa Link para navegação

/**
 * Componente que busca e renderiza a lista de todas as avaliações disponíveis.
 *
 * Ele se conecta ao Redux Store (avaliacaoSlice), busca os dados
 * (`fetchAvaliacoes`), e mapeia os resultados, renderizando um
 * `CardAvaliacao` para cada item.
 *
 * @returns {JSX.Element} A lista de cards de avaliação.
 */
const ListaCardAvaliacao = () => {
  const dispatch = useDispatch();
  
  // Seletores do Redux para buscar dados e status
  const avaliacoes = useSelector(selectAllAvaliacoes); 
  const avaliacoesStatus = useSelector((state) => state.avaliacoes.status);
  const error = useSelector((state) => state.avaliacoes.error);

  // Efeito para carregar as avaliações na montagem do componente,
  // caso ainda não tenham sido carregadas (status "idle").
  useEffect(() => {
    if (avaliacoesStatus === "idle") {
      dispatch(fetchAvaliacoes());
    }
  }, [avaliacoesStatus, dispatch]);

  // Função utilitária para formatar a data
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

  // Renderização condicional baseada no status da busca (loading, succeeded, failed)
  let content;

  if (avaliacoesStatus === "loading") {
    content = <Typography sx={{ p: 2 }}>Carregando avaliações...</Typography>;
  } else if (avaliacoesStatus === "succeeded") {
    
    if (avaliacoes.length === 0) {
         content = <Typography sx={{ p: 2 }}>Nenhuma avaliação disponível. Crie uma nova!</Typography>;
    } else {
        // Mapeia os dados do Redux para os cards
        content = avaliacoes.map((avaliacao) => (
            <CardAvaliacao
                key={avaliacao.id}
                titulo={avaliacao.titulo}
                data={formatarData(avaliacao.dataCriacao)} 
                // O link aponta para a rota de preenchimento da avaliação específica
                link={`/fazer-avaliacao/${avaliacao.id}`} 
            />
        ));
    }
  } else if (avaliacoesStatus === "failed") {
    content = <Typography color="error" sx={{ p: 2 }}>Erro ao carregar avaliações: {error}. Verifique a API.</Typography>;
  }

  return (
    <div className="lista-avaliacoes">
      {content}
    </div>
  );
};

export default ListaCardAvaliacao;
