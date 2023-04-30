import styles from "./goBack.module.css";
import Image from "next/image";
import arrow from "../../../public/assets/icon-arrow-left.svg";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "../../shared/store/theme-context";

const GoBack = () => {

  const { setThemeStyles } = useContext(ThemeContext);

  return (
    <Link href="/">
      <div className={styles.container}>
        <div>
          <Image src={arrow} alt="arrow" />
        </div>
        <p className={`${styles.text} ${setThemeStyles("textOne")}`}>Go back</p>
      </div>
    </Link>
  );
};

export default GoBack;
