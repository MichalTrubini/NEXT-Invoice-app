import { useContext } from "react";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";
import SiteContext from "../../store/site-context";
import GoBack from "../../components/goBack";

const InvoiceBody: React.FC = () => {
  const { setThemeStyles } = useContext(SiteContext);

  return (
    <div className={`${styles.invoice} ${setThemeStyles("backgroundSeven")}`}>
      <div className={styles.pdg}>
        <GoBack />
        <h2 className={`${styles.header} ${setThemeStyles("textOne")}`}>New Invoice</h2>
      </div>
      <InvoiceForm />
    </div>
  );
};

export default InvoiceBody;
