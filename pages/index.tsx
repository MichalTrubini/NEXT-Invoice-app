import Head from "next/head";
import InvoiceHeader from "../src/modules/home/InvoiceHeader";
import { MongoClient } from "mongodb";
import InvoiceItems from "../src/modules/home/InvoiceItems";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Portal from "../src/layout/Portal";
import InvoiceBody from "../src/modules/invoiceCreate/InvoiceBody";
import Overlay from "../src/components/Overlay";
import fetchData from "../src/core/fetchData";

const Home = ({
  invoiceItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [invoiceData, setInvoiceData] = useState([
    {
      _id: "",
      invoiceNumber: "",
      clientName: "",
      clientEmail: "",
      supplierAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      createdAt: "",
      paymentDue: "",
      paymentTerms: "",
      description: "",
      items: [
        {
          name: "",
          quantity: "",
          price: "",
        },
      ],
      status: "",
    },
  ]);

  const [draftSelected, setDraft] = useState(false);
  const [pendingSelected, setPending] = useState(false);
  const [paidSelected, setPaid] = useState(false);

  const draft = draftSelected ? "draft" : "";
  const pending = pendingSelected ? "pending" : "";
  const paid = paidSelected ? "paid" : "";

  const [newInvoice, setNewInvoice] = useState(false);
  const [animate, setAnimate] = useState(false);

  const selectedByFilter = [draft, pending, paid];
  const data = invoiceData.filter((item: any) =>
    selectedByFilter.includes(item.status)
  );

  const sourceData = () => {
    if (
      draftSelected === false &&
      pendingSelected === false &&
      paidSelected === false
    )
      return invoiceData;
    else return data;
  };

  const invoiceQty = sourceData().length;

  useEffect(() => {
    setInvoiceData(invoiceItems);

  }, [invoiceItems]);

  const newInvoiceHandler = () => {
    setNewInvoice(true);
    setAnimate(true);
  };

  const modalCloseHandler = () => {
    setTimeout(() => {
      setNewInvoice(false);
    }, 200);
    setAnimate(false);
    window.scrollTo(0, 0);
  };

  const fetchDataHandler = async (data: any, method: string, id?: string) => {
    const fetchedData = await fetchData(data, method, id);
    setInvoiceData(fetchedData);
  }

  return (
    <div>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <Portal selector={"#Portal"}>
          {newInvoice && (
            <InvoiceBody
              animation={animate}
              close={modalCloseHandler}
              title="New Invoice"
              edit={false}
              triggerFetch={fetchDataHandler}
            />
          )}
        </Portal>
        <Portal selector={"#Overlay"}>
          {newInvoice && <Overlay onClick={modalCloseHandler} />}
        </Portal>
        <InvoiceHeader
          draft={() => setDraft((prevValue: boolean) => !prevValue)}
          pending={() => setPending((prevValue: boolean) => !prevValue)}
          paid={() => setPaid((prevValue: boolean) => !prevValue)}
          draftSelected={draftSelected}
          pendingSelected={pendingSelected}
          paidSelected={paidSelected}
          invoiceQty={invoiceQty}
          newInvoiceHandler={newInvoiceHandler}
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

  const invoiceItemsRaw = await documents.find().toArray();

  const invoiceItems = invoiceItemsRaw.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  client.close();

  return {
    props: {
      invoiceItems: invoiceItems,
    },
  };
};

export default Home;
