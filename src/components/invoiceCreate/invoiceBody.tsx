import { useContext } from "react";
import GoBack from "../invoiceView/goBack";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";
import ThemeContext from "../../shared/store/theme-context";

const InvoiceBody: React.FC = () => {
  const { setThemeStyles } = useContext(ThemeContext);

  return (
    <div className={`${styles.invoice} ${setThemeStyles("backgroundSeven")}`}>
      <GoBack />
      <h2 className={`${styles.header} ${setThemeStyles("textOne")}`}>New Invoice</h2>
      <InvoiceForm />
    </div>
  );
};

export default InvoiceBody;
