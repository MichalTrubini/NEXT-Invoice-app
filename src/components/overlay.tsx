import styles from "./Overlay.module.css";

const Overlay:React.FC<{onClick: () => void}> = (props) => {
  return <div className={styles.overlay} onClick={props.onClick}></div>;
};

export default Overlay;
