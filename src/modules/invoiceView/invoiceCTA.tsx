import {SiteContext} from "../../store/site-context";
import styles from "./invoiceCTA.module.css";
import { useContext } from "react";
import Button from "../../components/button";

const invoiceCTA: React.FC<{showModal: () => void}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <div className={`${styles.container} ${setThemeStyles("backgroundThree")}`}>
      <Button description="Edit" buttonType={`${setThemeStyles("backgroundFive")} ${setThemeStyles("textSix")} ${styles.edit}`} onClick={handleClick}/>
      <Button description="Delete" buttonType={styles.delete} onClick={props.showModal}/>
      <Button description="Mark as Paid" buttonType={styles.paid} onClick={handleClick}/>
    </div>
  );
};

export default invoiceCTA;
