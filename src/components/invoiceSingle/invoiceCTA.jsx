import styles from "./invoiceCTA.module.css";

const invoiceCTA = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.button} ${styles.edit}`}>Edit</div>
      <div className={`${styles.button} ${styles.delete}`}>Delete</div>
      <div className={`${styles.button} ${styles.paid}`}>Mark as Paid</div>
    </div>
  );
};

export default invoiceCTA;
