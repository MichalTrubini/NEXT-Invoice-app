import styles from "./button.module.css";

const Button: React.FC<{description: string; name?: string; value?: string; buttonType: string; onClick?: ()=>void}> = (props) => {
  return <button className={`${styles.button} ${props.buttonType}`} onClick={props.onClick} name={props.name} value={props.value}>{props.description}</button>;
};

export default Button;
