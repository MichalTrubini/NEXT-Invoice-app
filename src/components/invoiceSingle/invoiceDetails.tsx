import styles from "./invoiceDetails.module.css";
import  IDetails  from "../../shared/types/types";
const InvoiceDetails: React.FC<IDetails> = (props) => {
  return (
    <div className={styles.invoiceContainer}>
      <div className={styles.top}>
        <div>
          <p className={styles.invoiceNumber}>
            <span className={styles.hash}>#</span>
            <span className={styles.invoiceID}>{props._id}</span>
          </p>
          <p className={styles.text}>{props.description}</p>
        </div>
        <div className={styles.text}>
          <p className={styles.marginFix}>{props.senderStreet}</p>
          <p className={styles.marginFix}>{props.senderCity}</p>
          <p className={styles.marginFix}>{props.senderPostCode}</p>
          <p className={styles.marginFix}>{props.senderCountry}</p>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.middleTop}>
          <div className={styles.left}>
            <div className={styles.invoiceDateContainer}>
              <p className={`${styles.marginFixTwo} ${styles.text}`}>Invoice Date</p>
              <p className={styles.textBold}>{props.createdAt}</p>
            </div>
            <div className={styles.invoiceDateContainer}>
              <p className={`${styles.marginFixTwo} ${styles.text}`}>Payment Due</p>
              <p className={styles.textBold}>{props.paymentDue}</p>
            </div>
          </div>
          <div className={styles.right}>
            <p className={`${styles.marginFixTwo} ${styles.text}`}>Bill to</p>
            <p className={styles.textBold}>{props.clientName}</p>
            <p className={`${styles.marginFix} ${styles.text}`}>{props.clientStreet}</p>
            <p className={`${styles.marginFix} ${styles.text}`}>{props.clientCity}</p>
            <p className={`${styles.marginFix} ${styles.text}`}>{props.clientPostCode}</p>
            <p className={`${styles.marginFix} ${styles.text}`}>{props.clientCountry}</p>
          </div>
        </div>
        <div>
          <p className={`${styles.marginFixTwo} ${styles.text}`}>Sent To</p>
          <p className={styles.textBold}>{props.clientEmail}</p>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default InvoiceDetails;
