import Header from "./header";
import SiteContext from "../store/site-context";
import { useContext } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { setThemeStyles } = useContext(SiteContext);

  return (
    <div className={setThemeStyles("backgroundOne")}>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
