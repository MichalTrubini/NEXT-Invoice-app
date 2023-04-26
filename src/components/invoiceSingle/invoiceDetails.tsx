import styles from "./invoiceDetails.module.css";
import IDetails from "../../shared/types/types";
import { useContext } from "react";
import ThemeContext from "../../shared/store/theme-context";

const InvoiceDetails: React.FC<IDetails> = (props) => {
  const { setThemeStyles } = useContext(ThemeContext);

  const totalPrice = props.items.reduce((total, item) => {
    return total + item.quantity * item.price;
}, 0);

  return (
    <div className={`${styles.invoiceContainer} ${setThemeStyles("invoiceItem")}`}>
      <div className={styles.top}>
        <div>
          <p className={styles.invoiceNumber}>
            <span className={`${styles.hash} ${setThemeStyles("textTwo")}`}>#</span>
            <span className={`${styles.invoiceID} ${setThemeStyles("textOne")}`}>{props._id}</span>
          </p>
          <p className={`${styles.text} ${setThemeStyles("textTwo")}`}>{props.description}</p>
        </div>
        <div className={`${styles.text} ${setThemeStyles("textTwo")}`}>
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
              <p className={`${styles.marginFixTwo} ${styles.text} ${setThemeStyles("textTwo")}`}>Invoice Date</p>
              <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>{props.createdAt}</p>
            </div>
            <div className={styles.invoiceDateContainer}>
              <p className={`${styles.marginFixTwo} ${styles.text} ${setThemeStyles("textTwo")}`}>Payment Due</p>
              <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>{props.paymentDue}</p>
            </div>
          </div>
          <div className={styles.right}>
            <p className={`${styles.marginFixTwo} ${styles.text} ${setThemeStyles("textTwo")}`}>Bill to</p>
            <p className={`${styles.textBold} ${styles.marginFixThree} ${setThemeStyles("textOne")}`}>
              {props.clientName}
            </p>
            <p className={`${styles.marginFix} ${styles.text} ${setThemeStyles("textTwo")}`}>{props.clientStreet}</p>
            <p className={`${styles.marginFix} ${styles.text} ${setThemeStyles("textTwo")}`}>{props.clientCity}</p>
            <p className={`${styles.marginFix} ${styles.text} ${setThemeStyles("textTwo")}`}>{props.clientPostCode}</p>
            <p className={`${styles.marginFix} ${styles.text} ${setThemeStyles("textTwo")}`}>{props.clientCountry}</p>
          </div>
        </div>
        <div>
          <p className={`${styles.marginFixTwo} ${styles.text} ${setThemeStyles("textTwo")}`}>Sent To</p>
          <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>{props.clientEmail}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <div className={`${styles.bottomContentTop} ${setThemeStyles("invoiceItems")}`}>
            {props.items.map((item, id) => (
              <div className={styles.itemRow} key={id}>
                <div className={styles.itemDescription}>
                  <p className={`${styles.item} ${setThemeStyles("textOne")}`}>{item.name}</p>
                  <p className={`${styles.item} ${setThemeStyles("textFour")}`}>{`${
                    item.quantity
                  } x € ${item.price.toFixed(2).toLocaleString("sk")}`}</p>
                </div>
                <div>
                  <p className={`${styles.item} ${setThemeStyles("textOne")}`}>{`€ ${(
                    item.quantity * item.price
                  ).toLocaleString("sk")}`}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.bottomContentBottom} ${setThemeStyles("invoiceTotal")}`}>
            <p className={styles.grandTotalText}>Grand Total</p>
            <p className={styles.grandTotal}>{`€ ${totalPrice.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
