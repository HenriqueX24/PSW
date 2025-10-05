import React from "react";
import CardAvaliacao from "./CardAvaliacao"; // Supondo que você salvou o componente neste caminho

const ListaCardAvaliacao = () => {
  // 1. Dados do card original
  const avaliacaoOriginal = {
    titulo: "Avaliação 360",
    data: "18/08/2025",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeac0NDz1hlTsUdRy33boOPd1rP6zB6VBTmeDx55P5fugkIdg/viewform?usp=header",
  };

  // 2. Novo cadastro de card
  const novaAvaliacao = {
    titulo: "Avaliação PCH",
    data: "05/09/2025",
    link: "",
  };

  return (
    <div className="lista-avaliacoes">
      {/* Card 1: Avaliação Original */}
      <CardAvaliacao
        titulo={avaliacaoOriginal.titulo}
        data={avaliacaoOriginal.data}
        link={avaliacaoOriginal.link}
      />

      {/* Card 2: Novo Card Cadastrado pelo Usuário */}
      <CardAvaliacao
        titulo={novaAvaliacao.titulo}
        data={novaAvaliacao.data}
        link={novaAvaliacao.link}
      />

      {/* Você pode renderizar dinamicamente uma lista a partir de um array de dados */}
      {/* Por exemplo, cards.map(card => <CardAvaliacao key={card.id} {...card} />) */}
    </div>
  );
};

export default ListaCardAvaliacao;
