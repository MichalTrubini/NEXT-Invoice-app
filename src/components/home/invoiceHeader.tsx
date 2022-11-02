import styles from "./invoiceHeader.module.css";
import ThemeContext from "../../shared/store/theme-context";
import { useContext } from "react";
import Image from "next/image";
import arrow from "../../../public/assets/icon-arrow-down.svg";
import plus from "../../../public/assets/icon-plus.svg";
import { useScreenWidth } from "../../shared/utils/hooks";

const InvoiceHeader = () => {
  const { setThemeStyles } = useContext(ThemeContext);
  const tabletBreakpoint = 768;
  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.heading} ${setThemeStyles("textOne")}`}>Invoices</h1>
          {useScreenWidth() < tabletBreakpoint && (
            <p className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}>7 invoices</p>
          )}
          {useScreenWidth() > tabletBreakpoint - 1  && (
            <p className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}>There are 7 total invoices</p>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.filterBlock}>
            {useScreenWidth() < tabletBreakpoint && <p className={`${styles.filter} ${setThemeStyles("textOne")}`}>Filter</p>}
            {useScreenWidth() > tabletBreakpoint - 1  && (
              <p className={`${styles.filter} ${setThemeStyles("textOne")}`}>Filter by status</p>
            )}
            <div>
              <Image src={arrow} alt="arrow" />
            </div>
          </div>
          <div className={styles.addContainer}>
            <div className={styles.plusContainer}>
              <Image src={plus} alt="plus" />
            </div>
            {useScreenWidth() < tabletBreakpoint && <p className={styles.addInvoice}>New</p>}
            {useScreenWidth() > tabletBreakpoint - 1 && <p className={styles.addInvoice}>New Invoice</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeader;
