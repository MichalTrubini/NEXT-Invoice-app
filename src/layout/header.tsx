import styles from "./header.module.css";
import logo from "../../public/assets/logo.svg";
import moon from "../../public/assets/icon-moon.svg";
import sun from "../../public/assets/icon-sun.svg";
import avatar from "../../public/assets/image-avatar.jpg";
import Image from "next/image";
import { useContext } from "react";
import SiteContext from "../store/site-context";
import Link from "next/link";

const Header = () => {
  const { setDarkTheme } = useContext(SiteContext);
  const { darkTheme } = useContext(SiteContext);
  const { setThemeStyles } = useContext(SiteContext);

  const themeHandler = () => {
    setDarkTheme((prevValue: boolean) => !prevValue);
  };

  return (
    <header id='appHeader' className={`${styles.header} ${setThemeStyles("backgroundTwo")}`}>
      <div className={`${styles.imageContainer} ${styles.imageLogoContainer}`}>
        <Link href="/">
          <Image src={logo} alt="invoice app" className={styles.imageLogo} />
        </Link>
      </div>
      <div className={styles.rightBlock}>
        <div className={`${styles.imageContainer} ${styles.imageTheme}`} onClick={themeHandler}>
          <Image
            src={!darkTheme ? moon : sun}
            alt={!darkTheme ? "light theme" : "dark theme"}
            className={styles.mode}
          />
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
