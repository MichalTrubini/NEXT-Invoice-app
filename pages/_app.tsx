import "../src/shared/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/shared/layout/layout";
import { ThemeProvider } from "../src/shared/store/theme-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
