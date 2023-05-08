import Head from "next/head";
import { MongoClient } from "mongodb";
import GoBack from "../../src/components/goBack";
import InvoiceStatus from "../../src/modules/invoiceView/invoiceStatus";
import InvoiceCTA from "../../src/modules/invoiceView/invoiceCTA";
import { useMediaQuery } from "../../src/utils/hooks";
import InvoiceDetails from "../../src/modules/invoiceView/invoiceDetails";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext } from "react";
import SiteContext from "../../src/store/site-context";

const InvoiceSingle = ({ invoiceItem }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const tabletBreakpoint = 768;
  const matches = useMediaQuery(tabletBreakpoint);
  const { setThemeStyles } = useContext(SiteContext);
  console.log(invoiceItem);
  return (
    <>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <GoBack />
        <div className={`${setThemeStyles("backgroundThree")} statusCTA`}>
          <InvoiceStatus status={invoiceItem.status} />
          {matches && <InvoiceCTA />}
        </div>
        <InvoiceDetails
          _id={invoiceItem._id}
          description={invoiceItem.description}
          senderStreet={invoiceItem.senderAddress.street}
          senderCity={invoiceItem.senderAddress.city}
          senderPostCode={invoiceItem.senderAddress.postCode}
          senderCountry={invoiceItem.senderAddress.country}
          createdAt={invoiceItem.createdAt}
          paymentDue={invoiceItem.paymentDue}
          clientName={invoiceItem.clientName}
          clientStreet={invoiceItem.clientAddress.street}
          clientCity={invoiceItem.clientAddress.city}
          clientPostCode={invoiceItem.clientAddress.postCode}
          clientCountry={invoiceItem.clientAddress.country}
          clientEmail={invoiceItem.clientEmail}
          items={invoiceItem.items}
        />
      </div>
      {!matches && <InvoiceCTA />}
    </>
  );
};

export default InvoiceSingle;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const page = String(context.params.invoiceID);

  const databaseConnection: string | undefined = process.env.DB_URL;

  if (!databaseConnection) {
    throw new Error("Database connection string not found");
  }

  const client = await MongoClient.connect(databaseConnection);

  const db = client.db();

  const documents = db.collection("invoiceItems");

  const invoiceItem = await documents.findOne({ _id: page });

  client.close();

  return {
    props: {
      invoiceItem: invoiceItem,
    },
  };
};
