import styles from "./deleteModal.module.css";

const DeleteModal = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Confirm Deletion</h2>
        <p className={styles.text}>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
        <div className={styles.buttons}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.delete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
