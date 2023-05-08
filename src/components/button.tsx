import styles from "./button.module.css";

const Button: React.FC<{description: string; buttonType: string; onClick: ()=>void}> = (props) => {
  return <button className={`${styles.button} ${props.buttonType}`} onClick={props.onClick}>{props.description}</button>;
};

export default Button;
