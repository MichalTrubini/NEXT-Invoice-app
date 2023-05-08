import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/layout/layout";
import { SiteProvider } from "../src/store/site-context";

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
