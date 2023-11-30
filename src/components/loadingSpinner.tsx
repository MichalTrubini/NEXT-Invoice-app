import { PuffLoader } from "react-spinners";
import styles from "./loadingSpinner.module.css";
import { useContext } from "react";
import { SiteContext } from "store/site-context";

const LoadingSpinner = () => {
  const { setThemeStyles } = useContext(SiteContext)!;

  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.overlay}></div>
      <PuffLoader color={setThemeStyles('spinner') === 'spinner-light' ? '#0c0e16' : '#fff'} loading={true} size={120} />
    </div>
  );
};

export default LoadingSpinner;
