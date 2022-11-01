import styles from "./header.module.css";
import logo from "../../../public/assets/logo.svg";
import moon from "../../../public/assets/icon-moon.svg";
import avatar from "../../../public/assets/image-avatar.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.imageContainer} ${styles.imageLogoContainer}`}>
        <Image src={logo} alt="invoice app" className={styles.imageLogo}/>
      </div>
      <div className={styles.rightBlock}>
        <div className={`${styles.imageContainer} ${styles.imageTheme}`}>
          <Image src={moon} alt="theme" />
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.imageContainer} ${styles.imageAvatar}`}>
          <Image src={avatar} alt="avatar" layout="fill" />
        </div>
      </div>
    </header>
  );
};

export default Header;
