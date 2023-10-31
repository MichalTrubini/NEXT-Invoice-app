import { SiteContext } from "../../store/site-context";
import styles from "./invoiceCTA.module.css";
import { useContext } from "react";
import Button from "../../components/Button";

const invoiceCTA: React.FC<{
  showModal: () => void;
  editInvoice: () => void;
  handleStatus: (status: string) => void;
  status: string
}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;

  return (
    <div className={`${styles.container} ${setThemeStyles("backgroundThree")}`}>
      <Button
        description="Edit"
        buttonType={`${setThemeStyles("backgroundFive")} ${setThemeStyles(
            "hoverOne")} ${styles.edit}`}
        onClick={props.editInvoice}
      />
      <Button
        description="Delete"
        buttonType={styles.delete}
        onClick={props.showModal}
      />
      <Button
        description={props.status === "paid" ? "Mark as Pending" : props.status === "pending" ? "Mark as Paid" : "Mark as Pending"}
        buttonType={styles.paid}
        onClick={() => props.handleStatus(props.status === "paid" ? "pending" : props.status === "pending" ? "paid" : "pending")}
      />
    </div>
  );
};

export default invoiceCTA;
