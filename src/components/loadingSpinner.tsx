import { PulseLoader } from "react-spinners";
import styles from "./loadingSpinner.module.css";
import { useContext } from "react";
import { SiteContext } from "store/site-context";

const LoadingSpinner = () => {
  const { setThemeStyles } = useContext(SiteContext)!;

  console.log(setThemeStyles('spinner'));
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.overlay}></div>
      <PulseLoader color={setThemeStyles('spinner') === 'spinner-light' ? '#0c0e16' : '#fff'} loading={true} size={50} />
    </div>
  );
};

export default LoadingSpinner;
