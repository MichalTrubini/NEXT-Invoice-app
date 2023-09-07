import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./invoiceForm.module.css";
import FormElement from "../../components/form/formElement";
import Button from "../../components/button";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../store/site-context";
import { Size } from "../../types/enums";
import { useScreenWidth } from "../../utils/hooks";
import Image from "next/image";
import Bin from "../../../public/assets/icon-delete.svg";

type Inputs = {
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostcode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: string;
  project: string;
  itemName: string;
  itemQty: number;
  itemPrice: number;
};

const InvoiceForm: React.FC<{ close: any }> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [formHeight, setFormHeight] = useState(0);
  const [bottomWidth, setBottomWidth] = useState(0);
  const [bottomPaddingLeft, setBottomPaddingLeft] = useState(0);
  const [newItems, setNewItems] = useState([{ name: "", qty: "", price: "" }]);

  const screenWidth = useScreenWidth();

  useEffect(() => {
    const appHeaderHeight = document.getElementById("appHeader")!.clientHeight;
    const appHeaderWidth = document.getElementById("appHeader")!.clientWidth;
    const invoiceHeaderHeight = document.getElementById("invoiceHeader")!.clientHeight;
    setFormHeight(
      screenWidth < Size.desktopBreakpoint
        ? window.innerHeight - appHeaderHeight - invoiceHeaderHeight
        : window.innerHeight - invoiceHeaderHeight
    );
    setBottomWidth(screenWidth < Size.desktopBreakpoint ? 616 : 616 + appHeaderWidth);
    setBottomPaddingLeft(screenWidth < Size.desktopBreakpoint ? 24 : appHeaderWidth + 24);
  }, [screenWidth]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { setThemeStyles, darkTheme } = useContext(SiteContext)!;

  const handleDiscardInvoice = () => {
    props.close();
  };
  const handleSaveDraft = () => {
    console.log();
  };
  const handleCreateInvoice = () => {
    console.log();
  };
  const addItemHandler = () => {
    setNewItems((prevItems) => {
      return [...prevItems, { name: "", qty: "", price: "" }];
    });
  };
  const deleteItemHandler = (index: number) => {
    setNewItems((prevItems) => {
      console.log(index)
        const newItems = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
        return newItems;
    });
  };

  console.log(newItems);
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      style={screenWidth > Size.modalBreakpoint ? { height: formHeight } : { height: "auto" }}
    >
      <div className={styles.formTop}>
        <div className={styles.mgBottom}>
          <h3 className={styles.formHeader}>Bill From</h3>
          <FormElement label="Street Address" {...register("streetAddress")} />
          <div className={styles.gridArea}>
            <div className={styles.city}>
              <FormElement label="City" {...register("city")} />
            </div>
            <div className={styles.postCode}>
              <FormElement label="Post Code" {...register("postcode")} />
            </div>
            <div className={styles.country}>
              <FormElement label="Country" {...register("country")} />
            </div>
          </div>
        </div>
        <div className={styles.mgBottom}>
          <h3 className={styles.formHeader}>Bill To</h3>
          <FormElement label="Client's Name" {...register("clientName")} />
          <FormElement label="Client's Email" {...register("clientEmail")} />
          <FormElement label="Street Address" {...register("clientStreetAddress")} />
          <div className={styles.gridArea}>
            <div className={styles.city}>
              <FormElement label="City" {...register("clientCity")} />
            </div>
            <div className={styles.postCode}>
              <FormElement label="Post Code" {...register("clientPostcode")} />
            </div>
            <div className={styles.country}>
              <FormElement label="Country" {...register("clientCountry")} />
            </div>
          </div>
        </div>
        <div className={styles.mgBottom}>
          <div className={styles.wrapper}>
            <FormElement label="Invoice Date" {...register("invoiceDate")} />
            <FormElement label="Payment Terms" {...register("paymentTerms")} />
          </div>
          <FormElement label="Project Description" {...register("project")} />
        </div>
        <div className={styles.addItemSection}>
          <h3 className={styles.listHeader}>Item List</h3>
          <ul className={styles.itemList}>
            {newItems.map((item, index) => (
              <li key={index} className={styles.itemRow}>
                <div>
                  <FormElement classNameCustom="displayNone" label="Item Name" {...register("itemName")} />
                </div>
                <div className={styles.itemFlexRow}>
                  <div className={styles.itemQty}>
                    <FormElement classNameCustom="displayNone" label="Qty." {...register("itemQty")} />
                  </div>
                  <div className={styles.itemPrice}>
                    <FormElement classNameCustom="displayNone" label="Price" {...register("itemPrice")} />
                  </div>
                  <div>
                    <label className={`${styles.label} displayNone ${setThemeStyles("textSix")}`}>Total</label>
                    <p
                      className={`${styles.itemPriceTotal} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      0.00
                    </p>
                  </div>
                  <div className={styles.deleteRow}>
                    <Image src={Bin} alt="delete row" onClick={()=>deleteItemHandler(index)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Button
            description="+ Add New Item"
            buttonType={`${styles.addItem} ${setThemeStyles("backgroundFive")} ${setThemeStyles("textFour")}`}
            onClick={addItemHandler}
          />
        </div>
        {errors.city && <span>This field is required</span>}
      </div>
      <div style={{ maxWidth: bottomWidth + "px" }}>
        <div
          style={{ left: "0px", paddingLeft: bottomPaddingLeft + "px" }}
          className={`${styles.formBottom} ${setThemeStyles("backgroundThree")} ${
            !darkTheme ? styles.formBottomShadow : null
          }`}
        >
          <Button
            description="Discard"
            buttonType={`${setThemeStyles("backgroundFive")} ${setThemeStyles("textSix")} ${styles.discard}`}
            onClick={handleDiscardInvoice}
          />
          <Button
            description="Save as Draft"
            buttonType={`${setThemeStyles("textTwo")} ${styles.saveDraft}`}
            onClick={handleSaveDraft}
          />
          <Button description="Create invoice" buttonType={styles.saveInvoice} onClick={handleCreateInvoice} />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
