import SiteContext from "../../store/site-context";
import styles from "./invoiceCTA.module.css";
import { useContext } from "react";
import Button from "../../components/button";

const invoiceCTA = () => {
  const { setThemeStyles } = useContext(SiteContext);

  return (
    <div className={`${styles.container} ${setThemeStyles("backgroundThree")}`}>
      <Button description="Edit" buttonType={`${setThemeStyles("backgroundFive")} ${setThemeStyles("textSix")} ${styles.edit}`}/>
      <Button description="Delete" buttonType={styles.delete}/>
      <Button description="Mark as Paid" buttonType={styles.paid}/>
    </div>
  );
};

export default invoiceCTA;
