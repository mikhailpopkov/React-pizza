import styles from "./NotFound.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Страница не найдена 😕</h1>
      <div className={styles.text}>
        К сожалению такой страницы не существует
      </div>
    </div>
  );
}

export default NotFoundBlock;
