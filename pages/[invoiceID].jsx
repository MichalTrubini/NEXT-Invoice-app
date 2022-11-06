import Head from "next/head";
import { MongoClient } from "mongodb";
import GoBack from "../src/components/invoiceSingle/goBack";
import InvoiceStatus from "../src/components/invoiceSingle/invoiceStatus";

const InvoiceSingle = ({ invoiceItem }) => {
  console.log(invoiceItem);
  return (
    <>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoBack />
      <InvoiceStatus status={invoiceItem.status}/>
    </>
  );
};

export default InvoiceSingle;

export const getServerSideProps = async (context) => {
  const page = String(context.params.invoiceID);

  const databaseConnection = process.env.DB_URL;

  const client = await MongoClient.connect(databaseConnection);

  const db = client.db();

  const documents = db.collection("invoiceItems");

  const invoiceItem = await documents.findOne({ _id: page });

  client.close();

  return {
    props: {
      invoiceItem: invoiceItem
    },
  };
};
