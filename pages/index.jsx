import Head from "next/head";
import InvoiceHeader from "../src/components/home/invoiceHeader";
import { MongoClient } from "mongodb";
import InvoiceItems from "../src/components/home/invoiceItems";

const Home = ({invoiceItems}) => {

  return (
    <div>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvoiceHeader />
      <InvoiceItems invoiceItems={invoiceItems}/>
    </div>
  );
};

export const getServerSideProps = async () =>  {
  
  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/InvoiceApp?retryWrites=true&w=majority"
  );

  const db = client.db();
  
  const documents = db.collection("invoiceItems");

  const invoiceItems = await documents.find().toArray();

    client.close();

    return {
      props: {
        invoiceItems: invoiceItems
      },
    };

}

export default Home;
