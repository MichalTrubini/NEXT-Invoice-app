import Head from "next/head";
import InvoiceHeader from "../src/components/home/invoiceHeader";
import { MongoClient } from "mongodb";
import InvoiceItems from "../src/components/home/invoiceItems";
import { useState } from "react";

const Home = ({ invoiceItems }) => {
  const [draftSelected, setDraft] = useState(false);
  const [pendingSelected, setPending] = useState(false);
  const [paidSelected, setPaid] = useState(false);

  const draft = draftSelected ? 'draft' : '';
  const pending = pendingSelected ? 'pending' : '';
  const paid = paidSelected ? 'paid' : '';

  const selectedByFilter = [draft, pending, paid];
  const data = invoiceItems.filter((item) => selectedByFilter.includes(item.status));

  const sourceData = () => {
    if(draftSelected === false & pendingSelected === false & paidSelected === false) return invoiceItems;
    else return data
  }


  console.log(sourceData());

  return (
    <div>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvoiceHeader
        draft={() => setDraft((prevValue) => !prevValue)}
        pending={() => setPending((prevValue) => !prevValue)}
        paid={() => setPaid((prevValue) => !prevValue)}
      />
      <InvoiceItems invoiceItems={sourceData()} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const databaseConnection = process.env.DB_URL;

  const client = await MongoClient.connect(databaseConnection);

  const db = client.db();

  const documents = db.collection("invoiceItems");

  const invoiceItems = await documents.find().toArray();

  client.close();

  return {
    props: {
      invoiceItems: invoiceItems,
    },
  };
};

export default Home;
