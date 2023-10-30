import { useContext } from "react";
import Button from "./Button";
import styles from "./deleteModal.module.css";
import { SiteContext } from "../store/site-context";

const DeleteModal: React.FC<{
  closeHandler: () => void;
  deleteHandler: () => void;
  invoiceNumber: string;
}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  return (
    <div className={styles.overlay} onClick={props.closeHandler}>
      <div
        className={`${styles.modal} ${setThemeStyles("backgroundThree")}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`${styles.heading} ${setThemeStyles("textOne")}`}>
          Confirm Deletion
        </h2>
        <p className={`${styles.text} ${setThemeStyles("textFour")}`}>
          {`Are you sure you want to delete invoice #${props.invoiceNumber}? This action cannot be
          undone.`}
        </p>
        <div className={styles.buttons}>
          <Button
            description="Cancel"
            onClick={props.closeHandler}
            buttonType={`${styles.cancel} ${setThemeStyles(
              "textSix"
            )} ${setThemeStyles("backgroundFive")}`}
          />
          <Button
            description="Delete"
            onClick={props.deleteHandler}
            buttonType={styles.delete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
