import styles from "./invoiceHeader.module.css";
import ThemeContext from "../../shared/store/theme-context";
import { useContext, useState } from "react";
import Image from "next/image";
import arrow from "../../../public/assets/icon-arrow-down.svg";
import plus from "../../../public/assets/icon-plus.svg";
import { useScreenWidth } from "../../shared/utils/hooks";

const InvoiceHeader = (props) => {
  const { setThemeStyles } = useContext(ThemeContext);
  const tabletBreakpoint = 768;

  const [showCheckbox, setShowCheckbox] = useState(false);

  const showCheckboxHandler = () => {
    setShowCheckbox((prevValue) => !prevValue);
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.heading} ${setThemeStyles("textOne")}`}>Invoices</h1>
          {useScreenWidth() < tabletBreakpoint && (
            <p className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}>7 invoices</p>
          )}
          {useScreenWidth() > tabletBreakpoint - 1 && (
            <p className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}>There are 7 total invoices</p>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.filterBlock} >
            {useScreenWidth() < tabletBreakpoint && (
              <p className={`${styles.filter} ${setThemeStyles("textOne")}`} onClick={showCheckboxHandler}>Filter</p>
            )}
            {useScreenWidth() > tabletBreakpoint - 1 && (
              <p className={`${styles.filter} ${setThemeStyles("textOne")}`} onClick={showCheckboxHandler}>Filter by status</p>
            )}
            <div>
              <Image src={arrow} alt="arrow" className={showCheckbox ? styles.arrowUp : styles.arrowDown} onClick={showCheckboxHandler}/>
            </div>
            {showCheckbox && (
              <form className={styles.checkboxContainer}>
                <div className={styles.inputContainer}>
                  <input type="checkbox" id="draft" name="draft" className={styles.input} onClick={props.draft}/>
                  <label htmlFor="draft" className={styles.label}>
                    Draft
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input type="checkbox" id="pending" name="pending" className={styles.input} onClick={props.pending}/>
                  <label htmlFor="pending" className={styles.label}>
                    Pending
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input type="checkbox" id="paid" name="paid" className={styles.input} onClick={props.paid}/>
                  <label htmlFor="paid" className={styles.label}>
                    Paid
                  </label>
                </div>
              </form>
            )}
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
