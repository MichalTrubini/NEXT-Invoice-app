import styles from "./header.module.css";
import logo from "../../../public/assets/logo.svg";
import moon from "../../../public/assets/icon-moon.svg";
import sun from "../../../public/assets/icon-sun.svg";
import avatar from "../../../public/assets/image-avatar.jpg";
import Image from "next/image";
import { useContext } from "react";
import ThemeContext from '../store/theme-context'

const Header = () => {

  const {setDarkTheme} = useContext(ThemeContext);
  const {darkTheme} = useContext(ThemeContext);
  const {setThemeStyles} = useContext(ThemeContext);

  const themeHandler = () => {
    setDarkTheme((prevValue:Boolean) => !prevValue)
  }

  return (
    <header className={`${styles.header} ${setThemeStyles('headerBackground')}`}>
      <div className={`${styles.imageContainer} ${styles.imageLogoContainer}`}>
        <Image src={logo} alt="invoice app" className={styles.imageLogo} />
      </div>
      <div className={styles.rightBlock}>
        <div className={`${styles.imageContainer} ${styles.imageTheme}`} onClick={themeHandler}>
          <Image src={!darkTheme ? moon : sun} alt={!darkTheme ? 'light theme' : 'dark theme'} />
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.imageContainer} ${styles.imageAvatar}`}>
          <Image src={avatar} alt="avatar" layout="fill"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
