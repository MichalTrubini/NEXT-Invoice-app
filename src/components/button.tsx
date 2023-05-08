import styles from "./button.module.css";

const Button: React.FC<{description: string; buttonType: string}> = (props) => {
  return <button className={`${styles.button} ${props.buttonType}`}>{props.description}</button>;
};

export default Button;
