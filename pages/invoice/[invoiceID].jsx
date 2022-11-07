import Head from "next/head";
import { MongoClient } from "mongodb";
import GoBack from "../../src/components/invoiceSingle/goBack";
import InvoiceStatus from "../../src/components/invoiceSingle/invoiceStatus";
import InvoiceCTA from "../../src/components/invoiceSingle/invoiceCTA";
import { useMediaQuery } from "../../src/shared/utils/hooks";
import InvoiceDetails from "../../src/components/invoiceSingle/invoiceDetails";

const InvoiceSingle = ({ invoiceItem }) => {
  const tabletBreakpoint = 768;
  const matches = useMediaQuery(tabletBreakpoint);
  console.log(matches);
  return (
    <>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <GoBack />
        <div className="statusCTA">
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
        />
      </div>
      {!matches && <InvoiceCTA />}
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
      invoiceItem: invoiceItem,
    },
  };
};
