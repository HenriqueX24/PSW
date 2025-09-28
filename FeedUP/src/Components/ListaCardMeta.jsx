import "./ListaCardMeta.css";
import CardMeta from "./CardMeta.jsx";
import { useState } from "react";
import { Grid } from "@mui/material";

const ListaCardMeta = () => {
  const meta1 = {
    titulo: "Aumentar vendas em 10%",
    descricao: "Meta para o trimestre atual",
    status: "Pendente",
  };

  const meta2 = {
    titulo: "Reduzir churn em 5%",
    descricao: "Meta para o semestre",
    status: "Em análise",
  };

  const meta3 = {
    titulo: "Implementar novo CRM",
    descricao: "Meta anual",
    status: "Aprovado",
  };

  return (
    <div className="goals-section">
      {/* Card 1: meta1 */}
      <Grid>
        <CardMeta
          onClick={() => navigate("/meta-detalhe/1")}
          titulo={meta1.titulo}
          descricao={meta1.descricao}
          status={meta1.status}
        ></CardMeta>
      </Grid>

      {/* Card 2: meta2 */}
      <CardMeta
        titulo={meta2.titulo}
        descricao={meta2.descricao}
        status={meta2.status}
      />

      {/* Card 3: meta3 */}
      <CardMeta
        titulo={meta3.titulo}
        descricao={meta3.descricao}
        status={meta3.status}
      />

      {/* Você pode renderizar dinamicamente uma lista a partir de um array de dados */}
      {/* Por exemplo, cards.map(card => <CardAvaliacao key={card.id} {...card} />) */}
    </div>
  );
};
export default ListaCardMeta;
