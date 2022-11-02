import styles from "./invoiceItems.module.css";
import { useScreenWidth } from "../../shared/utils/hooks";
import ThemeContext from "../../shared/store/theme-context";
import { useContext } from "react";
import arrow from "../../../public/assets/icon-arrow-right.svg";
import Image from "next/image";

const InvoiceItems = () => {
  const { setThemeStyles } = useContext(ThemeContext);
  const tabletBreakpoint = 768;

  return (
    <div className={styles.invoiceItems}>
      <div className={`${styles.invoiceItem} ${setThemeStyles('invoiceItem')}`}>
        <div className={styles.topRow}>
          <h2 className={styles.invoiceHeader}>
            <span className={setThemeStyles('textTwo')}>#</span><span className={setThemeStyles('textOne')}>RT3080</span>
          </h2>
          {useScreenWidth() > tabletBreakpoint - 1 && <p className={styles.date}>Due 19 Aug 2021</p>}
          <p className={`${styles.name} ${setThemeStyles('textThree')}`}>Jensen Huang</p>
        </div>
        <div className={styles.bottomRow}>
          <div>
            {useScreenWidth() < tabletBreakpoint && <p className={`${styles.date} ${setThemeStyles('textTwo')}`}>Due 19 Aug 2021</p>}
            <p className={`${styles.price} ${setThemeStyles('textOne')}`}>£ 1,800.90</p>
          </div>
          <div className={styles.statusContainer}>
            <div className={styles.circle}></div>
            <p className={styles.status}>Paid</p>
            {useScreenWidth() > tabletBreakpoint - 1 && <Image src={arrow} alt='arrow' className={styles.arrowIcon}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItems;
