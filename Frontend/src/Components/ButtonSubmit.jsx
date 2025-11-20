import styles from "./ButtonSubmit.module.css";

/**
 * Um botão de submit de formulário simples e estilizado.
 *
 * Este botão é estático e exibe o texto "Enviar".
 * Utiliza CSS Modules para estilização.
 *
 * @returns {JSX.Element} O elemento do botão.
 */
function ButtonSubmit() {
  return (
    <button type="submit" className={styles.btnLogin}>
      Enviar
    </button>
  );
}
export default ButtonSubmit;
