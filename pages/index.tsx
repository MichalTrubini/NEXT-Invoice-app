import type { NextPage } from "next";
import Head from "next/head";
import InvoiceHeader from "../src/components/home/invoiceHeader";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvoiceHeader />
    </div>
  );
};

export default Home;
