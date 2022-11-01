import Header from "./header";
import ThemeContext from '../store/theme-context';
import { useContext } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {

   const {setThemeStyles} =  useContext(ThemeContext);

  return (
    <div className={setThemeStyles('backgroundMain')}>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
