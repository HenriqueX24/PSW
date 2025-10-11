import styles from "./ButtonSubmit.module.css";

function ButtonSubmit() {
  return (
    <button type="submit" className={styles.btnLogin}>
      Enviar
    </button>
  );
}
export default ButtonSubmit;
