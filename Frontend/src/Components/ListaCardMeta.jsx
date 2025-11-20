import "./ListaCardMeta.css";
import CardMeta from "./CardMeta.jsx";
import { Link } from "react-router-dom";

/**
 * Componente "burro" (de apresentação) que renderiza uma lista de metas.
 *
 * Recebe um array de 'metas' via props e mapeia cada uma para um
 * componente `CardMeta` envolvido por um `Link` (do React Router)
 * que leva à página de detalhes da meta.
 *
 * @param {object} props - As propriedades do componente.
 * @param {Array<object>} props.metas - O array de objetos de meta.
 * @param {string} [props.className] - Classe CSS opcional para o contêiner da lista.
 * @returns {JSX.Element} A lista de cards de meta.
 */
const ListaCardMeta = ({ metas, className }) => {
  return (
    // Usa a classe CSS recebida por props ou um valor padrão "goals-section"
    <div className={className || "goals-section"}>
      {/* Mapeia o array de metas. 
          O '?' (optional chaining) evita que o app quebre se 'metas' for nulo. */}
      {metas?.map((meta) => (
        // Cada card é um link para a página de detalhes da meta
        <Link to={`/meta-detalhe/${meta.id}`} key={meta.id} className="goal-card-link">
          <CardMeta
            meta={meta} // Passa o objeto 'meta' inteiro para o componente filho
            
            /* [NOTA]: O CardMeta antigo (que você me mostrou antes) esperava 
               props separadas (titulo, descricao, status).
               Este código está passando a prop 'meta' (um objeto). 
               Isso é uma melhoria, desde que o `CardMeta.jsx` 
               tenha sido atualizado para receber `({ meta })` 
               em vez de `({ titulo, descricao, status })`.
               Vou assumir que a versão do CardMeta que documentei
               no lote anterior (que recebia props separadas) 
               foi atualizada para esta nova forma.
            */
          />
        </Link>
        
      ))} 

    </div>
  );
};
export default ListaCardMeta;
