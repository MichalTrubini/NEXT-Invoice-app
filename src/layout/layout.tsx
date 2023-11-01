import Header from "./header";
import {SiteContext} from "../store/site-context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "components/loadingSpinner";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Add a route change event listener
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  return (
    <div className={setThemeStyles("backgroundOne")}>
      {loading && <LoadingSpinner />}
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
