import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assumindo react-router-dom

/**
 * Componente "Seta de Voltar".
 *
 * Renderiza um botão com um ícone de seta (chevron) que, ao ser clicado,
 * navega para a rota 'destino' fornecida via props, ou
 * retorna para a página anterior (`-1`) se 'destino' não for fornecido.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} [props.destino] - A rota (path) opcional para onde navegar (ex: "/home").
 * @returns {JSX.Element} O botão de voltar.
 */
export default function SetaVoltar({ destino }) {
    // Se o navigate for usado internamente
    const navigate = useNavigate(); // Hook do react-router-dom

    const handleVoltar = () => {
        // Navega para o 'destino' passado como prop
        navigate(destino || -1); // Usa 'destino' ou volta para a página anterior (-1)
    };

    return (
        <div>
            <button
                type="button"
                className="voltar"
                onClick={handleVoltar}
                aria-label="Voltar"
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke="#5cc6ba"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}
