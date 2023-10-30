import Head from "next/head";
import { MongoClient } from "mongodb";
import GoBack from "../../src/components/GoBack";
import InvoiceStatus from "../../src/modules/invoiceView/InvoiceStatus";
import InvoiceCTA from "../../src/modules/invoiceView/InvoiceCTA";
import { useMediaQuery } from "../../src/utils/hooks";
import InvoiceDetails from "../../src/modules/invoiceView/InvoiceDetails";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../src/store/site-context";
import Portal from "../../src/layout/Portal";
import DeleteModal from "../../src/components/DeleteModal";
import InvoiceBody from "../../src/modules/invoiceCreate/InvoiceBody";
import Overlay from "../../src/components/Overlay";
import fetchData from "../../src/core/fetchData";
import { useRouter } from "next/router";

const InvoiceSingle = ({
  invoiceItem,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const tabletBreakpoint = 768;
  const matches = useMediaQuery(tabletBreakpoint);
  const { setThemeStyles } = useContext(SiteContext)!;
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
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
  });
  const router = useRouter();

  const deleteHandler = () => {
    setShowModal(false);
    fetchData(null, "DELETE", invoiceItem._id);
    router.push("/");
  };

  const editHandler = () => {
    setEditInvoice(true);
    setAnimate(true);
  };

  const closeEditHandler = () => {
    setTimeout(() => {
      setEditInvoice(false);
    }, 200);
    setAnimate(false);
    window.scrollTo(0, 0);
  };

  const disableBodyScroll = () => {
    document.body.classList.add("modal-open");
  };

  // Function to remove the CSS class to enable scrolling
  const enableBodyScroll = () => {
    document.body.classList.remove("modal-open");
  };

  // Add and remove the CSS class when the component mounts and unmounts
  useEffect(() => {
    if (showModal) disableBodyScroll();
    else enableBodyScroll();
  }, [showModal]);

  useEffect(() => {
    setInvoiceData(invoiceItem);
  }, [invoiceItem]);

  const triggerFetchHandler = async (data: any, method: string, id?: string) => {
    const fetchedData = await fetchData(data, method, id);
    console.log(fetchedData)
    setInvoiceData(fetchedData);
  };

  return (
    <>
      <Head>
        <title>Invoice app</title>
        <meta name="description" content="Invoice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        <Portal selector={"#Portal"}>
          {showModal && (
            <DeleteModal
              closeHandler={() => setShowModal(false)}
              deleteHandler={deleteHandler}
              invoiceNumber={invoiceItem.invoiceNumber}
            />
          )}
        </Portal>
        <Portal selector={"#Portal"}>
          {editInvoice && (
            <InvoiceBody
              animation={animate}
              close={closeEditHandler}
              data={invoiceItem}
              title={`Edit #${invoiceItem.invoiceNumber}`}
              edit={true}
              triggerFetch={triggerFetchHandler}
            />
          )}
        </Portal>
        <Portal selector={"#Overlay"}>
          {editInvoice && <Overlay onClick={closeEditHandler} />}
        </Portal>
        <GoBack />
        <div className={`${setThemeStyles("backgroundThree")} statusCTA`}>
          <InvoiceStatus status={invoiceItem.status} />
          {matches && (
            <InvoiceCTA
              showModal={() => setShowModal(true)}
              editInvoice={editHandler}
            />
          )}
        </div>
        <InvoiceDetails
          invoiceNumber={invoiceData.invoiceNumber}
          description={invoiceData.description}
          supplierStreet={invoiceData.supplierAddress.street}
          supplierCity={invoiceData.supplierAddress.city}
          supplierPostCode={invoiceData.supplierAddress.postCode}
          supplierCountry={invoiceData.supplierAddress.country}
          createdAt={invoiceData.createdAt}
          paymentDue={invoiceData.paymentDue}
          clientName={invoiceData.clientName}
          clientStreet={invoiceData.clientAddress.street}
          clientCity={invoiceData.clientAddress.city}
          clientPostCode={invoiceData.clientAddress.postCode}
          clientCountry={invoiceData.clientAddress.country}
          clientEmail={invoiceData.clientEmail}
          items={invoiceData.items}
        />
      </div>
      {!matches && (
        <InvoiceCTA
          showModal={() => setShowModal(true)}
          editInvoice={editHandler}
        />
      )}
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

  const invoiceItemRaw = await documents.findOne({ invoiceNumber: page });
  const invoiceItem = {
    ...invoiceItemRaw,
    _id: invoiceItemRaw!._id.toString(),
  };

  client.close();

  return {
    props: {
      invoiceItem: invoiceItem,
    },
  };
};
