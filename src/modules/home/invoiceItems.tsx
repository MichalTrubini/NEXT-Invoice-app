import styles from "./invoiceItems.module.css";
import { SiteContext} from "../../store/site-context";
import { useContext } from "react";
import arrow from "../../../public/assets/icon-arrow-right.svg";
import Image from "next/image";
import { useMediaQuery } from "../../utils/hooks";
import Link from "next/link";
import { Size } from "../../types/enums";
import { getTotal } from "../../utils/functions";
import { InvoiceData } from "../../types/types";

const InvoiceItems: React.FC<{ invoiceItems: InvoiceData[] }> = (
  props
) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const matches = useMediaQuery(Size.tabletBreakpoint);

  return (
    <div className={styles.invoiceItems}>
      {props.invoiceItems.map((item) => (
        <Link href={`/invoice/${item.invoiceNumber}`} key={item._id}>
          <div className={`${styles.invoiceItem} ${setThemeStyles("backgroundThree")}`}>
            <div className={styles.topRow}>
              <h2 className={styles.invoiceHeader}>
                <span className={setThemeStyles("textTwo")}>#</span>
                <span className={setThemeStyles("textOne")}>{item.invoiceNumber}</span>
              </h2>
              {matches && <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>}
              <p className={`${styles.name} ${setThemeStyles("textThree")}`}>{item.clientName}</p>
            </div>
            <div className={styles.bottomRow}>
              <div>
                {!matches && <p className={`${styles.date} ${setThemeStyles("textTwo")}`}>Due 19 Aug 2021</p>}
                <p className={`${styles.price} ${setThemeStyles("textOne")}`}>{`€ ${getTotal(item.items).toLocaleString(
                  "sk"
                )}`}</p>
              </div>
              <div
                className={`${styles.statusContainer} ${
                  item.status === "paid"
                    ? styles.paid
                    : item.status === "pending"
                    ? styles.pending
                    : setThemeStyles("backgroundEight")
                }`}
              >
                <div
                  className={`${styles.circle} ${
                    item.status === "paid"
                      ? styles.paidCircle
                      : item.status === "pending"
                      ? styles.pendingCircle
                      : setThemeStyles("backgroundNine")
                  }`}
                ></div>
                <p className={`${styles.status} ${
                    item.status === "paid"
                      ? styles.paid
                      : item.status === "pending"
                      ? styles.pending
                      : setThemeStyles("textFive")
                  }`}>{item.status}</p>
                {matches && <Image src={arrow} alt="arrow" className={styles.arrowIcon} />}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default InvoiceItems;
