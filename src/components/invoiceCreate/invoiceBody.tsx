import GoBack from "../invoiceView/goBack";
import InvoiceForm from "./InvoiceForm";
import styles from "./invoiceBody.module.css";

const InvoiceBody: React.FC = () => {
  return (
    <div className={styles.invoice}>
      <GoBack />
      <h2 className={styles.header}>New Invoice</h2>
      <InvoiceForm />
    </div>
  );
};

export default InvoiceBody;
