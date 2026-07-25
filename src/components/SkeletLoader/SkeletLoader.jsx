import styles from "./SkeletLoader.module.css";

const SkeletLoader = ({ title = "Загрузка..." }) => {
  return (
    <div className={styles.loader}>
      <h2 className={styles.loader__title}>{title}</h2>
    </div>
  );
};

export default SkeletLoader;
