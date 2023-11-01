import styles from "./InvoiceHeader.module.css";
import { SiteContext } from "../../store/site-context";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import arrow from "../../../public/assets/icon-arrow-down.svg";
import plus from "../../../public/assets/icon-plus.svg";
import { useScreenWidth } from "../../utils/hooks";
import { Size } from "../../types/enums";

const InvoiceHeader: React.FC<{
  draft: () => void;
  pending: () => void;
  paid: () => void;
  draftSelected: boolean;
  pendingSelected: boolean;
  paidSelected: boolean;
  invoiceQty: number;
  newInvoiceHandler: () => void;
}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const tabletBreakpoint = Size.tabletBreakpoint;

  const [showCheckbox, setShowCheckbox] = useState(false);

  const showCheckboxHandler = () => {
    setShowCheckbox((prevValue) => !prevValue);
  };

  const ref = useRef<HTMLFormElement>(null);
  const refFilter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !refFilter.current!.contains(e.target as Node)
      ) {
        setShowCheckbox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={`${styles.heading} ${setThemeStyles("textOne")}`}>
            Invoices
          </h1>
          {useScreenWidth() < tabletBreakpoint && (
            <p
              className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}
            >
              {props.invoiceQty === 1
                ? `${props.invoiceQty} invoice`
                : `${props.invoiceQty} invoices`}
            </p>
          )}
          {useScreenWidth() > tabletBreakpoint - 1 && (
            <p
              className={`${styles.invoiceCount} ${setThemeStyles("textTwo")}`}
            >
              {props.invoiceQty === 1
                ? `There is ${props.invoiceQty} invoice in total`
                : `There are ${props.invoiceQty} total invoices`}
            </p>
          )}
        </div>
        <div className={styles.right} ref={refFilter}>
          <div className={styles.filterBlock}>
            {useScreenWidth() < tabletBreakpoint && (
              <p
                className={`${styles.filter} ${setThemeStyles("textOne")}`}
                onClick={showCheckboxHandler}
              >
                Filter
              </p>
            )}
            {useScreenWidth() > tabletBreakpoint - 1 && (
              <p
                className={`${styles.filter} ${setThemeStyles("textOne")}`}
                onClick={showCheckboxHandler}
              >
                Filter by status
              </p>
            )}
            <div>
              <Image
                src={arrow}
                alt="arrow"
                className={
                  showCheckbox
                    ? `${styles.arrowUp} ${styles.filter}`
                    : `${styles.arrowDown} ${styles.filter}`
                }
                onClick={showCheckboxHandler}
              />
            </div>
            {showCheckbox && (
              <form
                className={`${styles.checkboxContainer} ${setThemeStyles(
                  "backgroundFour"
                )}`}
                ref={ref}
              >
                <div className={styles.inputContainer}>
                  <input
                    type="checkbox"
                    id="draft"
                    name="draft"
                    className={`${styles.input} ${setThemeStyles(
                      "backgroundTen"
                    )}`}
                    onClick={props.draft}
                    defaultChecked={props.draftSelected}
                  />
                  <label
                    htmlFor="draft"
                    className={`${styles.label} ${setThemeStyles("textOne")}`}
                  >
                    Draft
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="checkbox"
                    id="pending"
                    name="pending"
                    className={`${styles.input} ${setThemeStyles(
                      "backgroundTen"
                    )}`}
                    onClick={props.pending}
                    defaultChecked={props.pendingSelected}
                  />
                  <label
                    htmlFor="pending"
                    className={`${styles.label} ${setThemeStyles("textOne")}`}
                  >
                    Pending
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="checkbox"
                    id="paid"
                    name="paid"
                    className={`${styles.input} ${setThemeStyles(
                      "backgroundTen"
                    )}`}
                    onClick={props.paid}
                    defaultChecked={props.paidSelected}
                  />
                  <label
                    htmlFor="paid"
                    className={`${styles.label} ${setThemeStyles("textOne")}`}
                  >
                    Paid
                  </label>
                </div>
              </form>
            )}
          </div>
          <div className={styles.addContainer} onClick={props.newInvoiceHandler}>
            <div className={styles.plusContainer}>
              <Image src={plus} alt="plus" />
            </div>
            {useScreenWidth() < tabletBreakpoint && (
              <p className={styles.addInvoice}>New</p>
            )}
            {useScreenWidth() > tabletBreakpoint - 1 && (
              <p className={styles.addInvoice}>New Invoice</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeader;
