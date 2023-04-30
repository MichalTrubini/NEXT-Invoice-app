import ThemeContext from "../../shared/store/theme-context";
import styles from "./invoiceCTA.module.css";
import { useContext } from "react";

const invoiceCTA = () => {
  const { setThemeStyles } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${setThemeStyles("invoiceItem")}`}>
      <div className={`${styles.button} ${styles.edit}`}>Edit</div>
      <div className={`${styles.button} ${styles.delete}`}>Delete</div>
      <div className={`${styles.button} ${styles.paid}`}>Mark as Paid</div>
    </div>
  );
};

export default invoiceCTA;
