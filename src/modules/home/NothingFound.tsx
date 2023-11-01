import Image from "next/image";
import nothingHere from "../../../public/assets/nothingFound.svg";
import styles from "./nothingFound.module.css";
import { useContext } from "react";
import { SiteContext } from "../../store/site-context";

const NothingFound = () => {
  const { setThemeStyles } = useContext(SiteContext)!;

  return (
    <div className={styles.nothingFound}>
      <Image src={nothingHere} alt="no invoices" />
      <div className={styles.textWrapper}>
        <h2 className={`${styles.heading} ${setThemeStyles("textOne")}`}>There is nothing here</h2>
        <p className={`${styles.text} ${setThemeStyles("textTwo")}`}>
          Create an invoice by clicking the{" "}
          <span className={styles.strong}>New Invoice</span> button and get
          started
        </p>
      </div>
    </div>
  );
};

export default NothingFound;
