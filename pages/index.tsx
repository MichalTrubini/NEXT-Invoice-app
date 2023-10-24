import Head from "next/head";
import InvoiceHeader from "../src/modules/home/invoiceHeader";
import { MongoClient } from "mongodb";
import InvoiceItems from "../src/modules/home/invoiceItems";
import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Home = ({ invoiceItems }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [draftSelected, setDraft] = useState(false);
  const [pendingSelected, setPending] = useState(false);
  const [paidSelected, setPaid] = useState(false);

  const draft = draftSelected ? "draft" : "";
  const pending = pendingSelected ? "pending" : "";
  const paid = paidSelected ? "paid" : "";

  const selectedByFilter = [draft, pending, paid];
  const data = invoiceItems.filter((item: any) => selectedByFilter.includes(item.status));

  const sourceData = () => {
    if (draftSelected === false && pendingSelected === false && paidSelected === false) return invoiceItems;
    else return data;
  };

  const invoiceQty = sourceData().length

  return (
    <div>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <InvoiceHeader
          draft={() => setDraft((prevValue: boolean) => !prevValue)}
          pending={() => setPending((prevValue: boolean) => !prevValue)}
          paid={() => setPaid((prevValue: boolean) => !prevValue)}
          draftSelected={draftSelected}
          pendingSelected={pendingSelected}
          paidSelected={paidSelected}
          invoiceQty={invoiceQty}
        />
        <InvoiceItems invoiceItems={sourceData()} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const databaseConnection: string | undefined = process.env.DB_URL;

  if (!databaseConnection) {
    throw new Error("Database connection string not found");
  }

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
