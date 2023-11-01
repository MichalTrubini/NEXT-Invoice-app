import styles from "./invoiceDetails.module.css";
import { InvoiceProps } from "../../types/types";
import { useContext } from "react";
import { SiteContext } from "../../store/site-context";
import { useMediaQuery } from "../../utils/hooks";
import { Size } from "../../types/enums";
import { formatDate, getTotal } from "../../utils/functions";

const InvoiceDetails: React.FC<InvoiceProps> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;

  const matches = useMediaQuery(Size.tabletBreakpoint);
  return (
    <div
      className={`${styles.invoiceContainer} ${setThemeStyles(
        "backgroundThree"
      )}`}
    >
      <div className={styles.top}>
        <div>
          <p className={styles.invoiceNumber}>
            <span className={`${styles.hash} ${setThemeStyles("textTwo")}`}>
              #
            </span>
            <span
              className={`${styles.invoiceID} ${setThemeStyles("textOne")}`}
            >
              {props.invoiceNumber}
            </span>
          </p>
          <p className={`${styles.text} ${setThemeStyles("textTwo")}`}>
            {props.description}
          </p>
        </div>
        <div className={`${styles.text} ${setThemeStyles("textTwo")}`}>
          <p className={styles.marginFix}>{props.supplierStreet}</p>
          <p className={styles.marginFix}>{props.supplierCity}</p>
          <p className={styles.marginFix}>{props.supplierPostCode}</p>
          <p className={styles.marginFix}>{props.supplierCountry}</p>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.middleTop}>
          <div className={styles.left}>
            <div className={styles.invoiceDateContainer}>
              <p
                className={`${styles.marginFixTwo} ${
                  styles.text
                } ${setThemeStyles("textTwo")}`}
              >
                Invoice Date
              </p>
              <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>
                {formatDate(new Date(props.createdAt))}
              </p>
            </div>
            <div className={styles.invoiceDateContainer}>
              <p
                className={`${styles.marginFixTwo} ${
                  styles.text
                } ${setThemeStyles("textTwo")}`}
              >
                Payment Due
              </p>
              <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>
                {formatDate(new Date(props.paymentDue))}
              </p>
            </div>
          </div>
          <div className={styles.right}>
            <p
              className={`${styles.marginFixTwo} ${
                styles.text
              } ${setThemeStyles("textTwo")}`}
            >
              Bill to
            </p>
            <p
              className={`${styles.textBold} ${
                styles.marginFixThree
              } ${setThemeStyles("textOne")}`}
            >
              {props.clientName}
            </p>
            <p
              className={`${styles.marginFix} ${styles.text} ${setThemeStyles(
                "textTwo"
              )}`}
            >
              {props.clientStreet}
            </p>
            <p
              className={`${styles.marginFix} ${styles.text} ${setThemeStyles(
                "textTwo"
              )}`}
            >
              {props.clientCity}
            </p>
            <p
              className={`${styles.marginFix} ${styles.text} ${setThemeStyles(
                "textTwo"
              )}`}
            >
              {props.clientPostCode}
            </p>
            <p
              className={`${styles.marginFix} ${styles.text} ${setThemeStyles(
                "textTwo"
              )}`}
            >
              {props.clientCountry}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`${styles.marginFixTwo} ${styles.text} ${setThemeStyles(
              "textTwo"
            )}`}
          >
            Sent To
          </p>
          <p className={`${styles.textBold} ${setThemeStyles("textOne")}`}>
            {props.clientEmail}
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <div
            className={`${styles.bottomContentTop} ${setThemeStyles(
              "backgroundFive"
            )}`}
          >
            <table className={styles.tableBody}>
              {matches && (
                <thead>
                  <tr>
                    <th
                      className={`${styles.tableHeader} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      Item Name
                    </th>
                    <th
                      className={`${styles.tableHeader} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      QTY.
                    </th>
                    <th
                      className={`${styles.tableHeader} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      Price
                    </th>
                    <th
                      className={`${styles.tableHeader} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      Total
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {props.items.map((item, id) => (
                  <tr className={styles.itemRow} key={id}>
                    {!matches && (
                      <td>
                        <div>
                          <p
                            className={`${styles.item} ${
                              styles.marginFix
                            } ${setThemeStyles("textOne")}`}
                          >
                            {item.name}
                          </p>
                          <p
                            className={`${styles.item} ${setThemeStyles(
                              "textFour"
                            )}`}
                          >{`${Number(item.quantity)} x € ${Number(item.price)}`}</p>
                        </div>
                      </td>
                    )}
                    {matches && (
                      <td
                        className={`${styles.item} ${setThemeStyles(
                          "textOne"
                        )}`}
                      >
                        {item.name}
                      </td>
                    )}
                    {matches && (
                      <td
                        className={`${styles.item} ${
                          styles.itemQty
                        } ${setThemeStyles("textFour")}`}
                      >
                        {item.quantity}
                      </td>
                    )}
                    {matches && (
                      <td
                        className={`${styles.item} ${
                          styles.itemPrice
                        } ${setThemeStyles("textFour")}`}
                      >{`€ ${Number(item.price).toLocaleString("sk")}`}</td>
                    )}
                    <td
                      className={`${styles.item} ${
                        styles.subtotal
                      } ${setThemeStyles("textOne")}`}
                    >{`€ ${(
                      Number(item.quantity) * Number(item.price)
                    ).toLocaleString("sk")}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={`${styles.bottomContentBottom} ${setThemeStyles(
              "backgroundSix"
            )}`}
          >
            <p className={styles.grandTotalText}>Grand Total</p>
            <p className={styles.grandTotal}>{`€ ${(getTotal(props.items)).toLocaleString(
              "sk"
            )}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
