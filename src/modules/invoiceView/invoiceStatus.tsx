import styles from "./invoiceStatus.module.css";
import { SiteContext } from "../../store/site-context";
import { useContext } from "react";

const InvoiceStatus: React.FC<{ status: string }> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${setThemeStyles("textTwo")}`}>Status</p>
      <div
        className={`${styles.statusContainer} ${
          props.status === "paid" ? styles.paid : props.status === "pending" ? styles.pending : setThemeStyles("draft")
        }`}
      >
        <div
          className={`${styles.circle} ${
            props.status === "paid"
              ? styles.paidCircle
              : props.status === "pending"
              ? styles.pendingCircle
              : setThemeStyles("draftCircle")
          }`}
        ></div>
        <p className={styles.status}>{props.status}</p>
      </div>
    </div>
  );
};

export default InvoiceStatus;
