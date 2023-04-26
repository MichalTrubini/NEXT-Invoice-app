import styles from "./invoiceItems.module.css";
import ThemeContext from "../../shared/store/theme-context";
import { useContext } from "react";
import arrow from "../../../public/assets/icon-arrow-right.svg";
import Image from "next/image";
import { useMediaQuery } from "../../shared/utils/hooks";
import Link from "next/link";
import { Size } from "../../shared/types/enums";

const InvoiceItems: React.FC<{invoiceItems: {_id: string, clientName: string, total: number, status: string}[]}> = (props) => {
  const { setThemeStyles } = useContext(ThemeContext);
  const matches = useMediaQuery(Size.tabletBreakpoint)

  return (
    <div className={styles.invoiceItems}>
      {props.invoiceItems.map((item) => (
        <Link href={`/invoice/${item._id}`} key={item._id}><div className={`${styles.invoiceItem} ${setThemeStyles("invoiceItem")}`} >
          <div className={styles.topRow}>
            <h2 className={styles.invoiceHeader}>
              <span className={setThemeStyles("textTwo")}>#</span>
              <span className={setThemeStyles("textOne")}>{item._id}</span>
            </h2>
            {matches && (
              <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>
            )}
            <p className={`${styles.name} ${setThemeStyles("textThree")}`}>{item.clientName}</p>
          </div>
          <div className={styles.bottomRow}>
            <div>
              {!matches && (
                <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>
              )}
              <p className={`${styles.price} ${setThemeStyles("textOne")}`}>{`€ ${item.total.toLocaleString("sk")}`}</p>
            </div>
            <div className={`${styles.statusContainer} ${item.status === 'paid' ? styles.paid : item.status === 'pending' ? styles.pending : setThemeStyles("draft")}`}>
              <div className={`${styles.circle} ${item.status === 'paid' ? styles.paidCircle : item.status === 'pending' ? styles.pendingCircle : setThemeStyles("draftCircle")}`}></div>
              <p className={styles.status}>{item.status}</p>
              {matches && (
                <Image src={arrow} alt="arrow" className={styles.arrowIcon} />
              )}
            </div>
          </div>
        </div></Link>
      ))}
    </div>
  );
};


export default InvoiceItems;
