import styles from "./invoiceItems.module.css";
import { useScreenWidth } from "../../shared/utils/hooks";
import ThemeContext from "../../shared/store/theme-context";
import { useContext } from "react";
import arrow from "../../../public/assets/icon-arrow-right.svg";
import Image from "next/image";

const InvoiceItems = (props) => {
  const { setThemeStyles } = useContext(ThemeContext);
  const tabletBreakpoint = 768;

  return (
    <div className={styles.invoiceItems}>
      {props.invoiceItems.map((item) => (
        <div className={`${styles.invoiceItem} ${setThemeStyles("invoiceItem")}`} key={item._id}>
          <div className={styles.topRow}>
            <h2 className={styles.invoiceHeader}>
              <span className={setThemeStyles("textTwo")}>#</span>
              <span className={setThemeStyles("textOne")}>{item._id}</span>
            </h2>
            {useScreenWidth() > tabletBreakpoint - 1 && (
              <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>
            )}
            <p className={`${styles.name} ${setThemeStyles("textThree")}`}>{item.clientName}</p>
          </div>
          <div className={styles.bottomRow}>
            <div>
              {useScreenWidth() < tabletBreakpoint && (
                <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>
              )}
              <p className={`${styles.price} ${setThemeStyles("textOne")}`}>{`£ ${item.total.toLocaleString("en-US")}`}</p>
            </div>
            <div className={`${styles.statusContainer} ${item.status === 'paid' ? styles.paid : item.status === 'pending' ? styles.pending : setThemeStyles("draft")}`}>
              <div className={`${styles.circle} ${item.status === 'paid' ? styles.paidCircle : item.status === 'pending' ? styles.pendingCircle : setThemeStyles("draftCircle")}`}></div>
              <p className={styles.status}>{item.status}</p>
              {useScreenWidth() > tabletBreakpoint - 1 && (
                <Image src={arrow} alt="arrow" className={styles.arrowIcon} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default InvoiceItems;
