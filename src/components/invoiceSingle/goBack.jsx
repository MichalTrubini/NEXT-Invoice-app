import styles from "./goBack.module.css";
import Image from "next/image";
import arrow from "../../../public/assets/icon-arrow-left.svg";
import Link from "next/link";

const GoBack = () => {
  return (
    <Link href="/">
      <div className={styles.container}>
        <div>
          <Image src={arrow} alt="arrow" />
        </div>
        <p className={styles.text}>Go back</p>
      </div>
    </Link>
  );
};

export default GoBack;
