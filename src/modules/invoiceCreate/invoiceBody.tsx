import { useContext } from "react";
import GoBack from "../invoiceView/goBack";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";
import SiteContext from "../../store/site-context";

const InvoiceBody: React.FC = () => {
  const { setThemeStyles } = useContext(SiteContext);

  return (
    <div className={`${styles.invoice} ${setThemeStyles("backgroundSeven")}`}>
      <GoBack />
      <h2 className={`${styles.header} ${setThemeStyles("textOne")}`}>New Invoice</h2>
      <InvoiceForm />
    </div>
  );
};

export default InvoiceBody;
