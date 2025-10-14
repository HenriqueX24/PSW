
import "./ListaCardMeta.css";
import CardMeta from "./CardMeta.jsx";
import { Link } from "react-router-dom";


const ListaCardMeta = ({ metas, className }) => {
  return (
    <div className={className || "goals-section"}>
      {metas?.map((meta) => (
        <Link to={`/meta-detalhe/${meta.id}`} key={meta.id} className="goal-card-link">
          <CardMeta
            titulo={meta.titulo}
            descricao={meta.descricao}
            status={meta.status}
          />
        </Link>
        
      ))} 

    </div>
  );
};
export default ListaCardMeta;
