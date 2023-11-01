import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { SiteProvider } from "../src/store/site-context";
import Layout from "../src/layout/layout";

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
