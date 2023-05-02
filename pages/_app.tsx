import "../src/shared/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/shared/layout/layout";
import { SiteProvider } from "../src/shared/store/site-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SiteProvider>
  );
}

export default MyApp;
