import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./invoiceForm.module.css";
import FormElement from "../../components/form/formElement";
import Button from "../../components/button";
import { useContext, useEffect, useRef, useState } from "react";
import { SiteContext } from "../../store/site-context";
import { Size } from "../../types/enums";
import { useScreenWidth } from "../../utils/hooks";
import Image from "next/image";
import Bin from "../../../public/assets/icon-delete.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import iconCalendar from "../../../public/assets/icon-calendar.svg";
import {
  DatePickerProps,
  DefaultValues,
  Inputs,
  InvoiceData,
} from "../../types/types";
import getItemValues from "../../utils/getItemValues";
import PaymentTermsPicker from "../../components/form/paymentTermsPicker";

function formatDate(date: Date | null): string {
  if (!date) return formatDate(new Date());
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const DatePicker: React.FC<DatePickerProps> = ({ field }) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const [dateClicked, setDateClicked] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !(datePickerRef.current as any).contains(event.target)
      ) {
        // Click occurred outside the DatePicker, so close the calendar
        setDateClicked(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={datePickerRef}>
      <label className={`${styles.label} ${setThemeStyles("textSix")}`}>
        Invoice date
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          readOnly
          value={formatDate(field.value)}
          onClick={() => setDateClicked((prev) => !prev)}
          onChange={(e) => {
            const selectedDate = e.target.value
              ? new Date(e.target.value)
              : null;
            field.onChange(selectedDate);
          }}
          className={`${styles.input} ${setThemeStyles(
            "backgroundThree"
          )} ${setThemeStyles("textOne")} ${setThemeStyles("borderOne")}`}
        />
        <Image
          src={iconCalendar}
          alt="calendar"
          className={styles.calendarIcon}
        />
      </div>
      {dateClicked && (
        <Calendar
          onChange={(date) => {
            if (date instanceof Date) {
              field.onChange(date);
            } else {
              field.onChange(null);
            }
            setDateClicked(false);
          }}
          value={formatDate(field.value)}
          className={`${styles.calendar} ${setThemeStyles("backgroundThree")}`}
          tileClassName={`${styles.calendarTile} ${setThemeStyles("textOne")}`}
          prev2Label={null}
          next2Label={null}
        />
      )}
    </div>
  );
};

const InvoiceForm: React.FC<{ close: any; data: InvoiceData }> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const [invoiceData, setInvoiceData] = useState({
    description: props.data ? props.data.description : "",
    senderAddress: {
      street: props.data ? props.data.senderAddress.street : "",
      city: props.data ? props.data.senderAddress.city : "",
      postCode: props.data ? props.data.senderAddress.postCode : "",
      country: props.data ? props.data.senderAddress.country : "",
    },
    createdAt: props.data ? props.data.createdAt : "",
    paymentDue: props.data ? props.data.paymentDue : "",
    clientAddress: {
      street: props.data ? props.data.clientAddress.street : "",
      city: props.data ? props.data.clientAddress.city : "",
      postCode: props.data ? props.data.clientAddress.postCode : "",
      country: props.data ? props.data.clientAddress.country : "",
    },
    clientName: props.data ? props.data.clientName : "",
    clientEmail: props.data ? props.data.clientEmail : "",
    items: props.data
      ? props.data.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))
      : [{ name: "", quantity: "", price: "" }],
  });

  const getDefaultValues = (invoiceData: InvoiceData): DefaultValues => {
    const defaultValues: DefaultValues = {
      clientCity: invoiceData.clientAddress.city,
      clientCountry: invoiceData.clientAddress.country,
      clientEmail: invoiceData.clientEmail,
      clientName: invoiceData.clientName,
      clientPostcode: invoiceData.clientAddress.postCode,
      clientStreetAddress: invoiceData.clientAddress.street,
      project: invoiceData.description,
      supplierCity: invoiceData.senderAddress.city,
      supplierCountry: invoiceData.senderAddress.country,
      supplierPostcode: invoiceData.senderAddress.postCode,
      supplierStreetAddress: invoiceData.senderAddress.street,
      invoiceDate: new Date() as any as string,
      paymentTerms: "Net 30 Days",
    };

    invoiceData.items.forEach((item, index) => {
      defaultValues[`name_${index}`] = item.name;
      defaultValues[`quantity_${index}`] = item.quantity.toString();
      defaultValues[`price_${index}`] = item.price.toString();
    });
    return defaultValues;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm<Inputs>({
    defaultValues: getDefaultValues(invoiceData),
  });

  useEffect(() => {
    reset(getDefaultValues(invoiceData));
  }, [invoiceData, reset]);

  const [formHeight, setFormHeight] = useState(0);
  const [bottomWidth, setBottomWidth] = useState(0);
  const [bottomPaddingLeft, setBottomPaddingLeft] = useState(0);

  const screenWidth = useScreenWidth();

  useEffect(() => {
    const appHeaderHeight = document.getElementById("appHeader")!.clientHeight;
    const appHeaderWidth = document.getElementById("appHeader")!.clientWidth;
    const invoiceHeaderHeight =
      document.getElementById("invoiceHeader")!.clientHeight;
    setFormHeight(
      screenWidth < Size.desktopBreakpoint
        ? window.innerHeight - appHeaderHeight - invoiceHeaderHeight
        : window.innerHeight - invoiceHeaderHeight
    );
    setBottomWidth(
      screenWidth < Size.desktopBreakpoint ? 616 : 616 + appHeaderWidth
    );
    setBottomPaddingLeft(
      screenWidth < Size.desktopBreakpoint ? 24 : appHeaderWidth + 24
    );
  }, [screenWidth]);

  const onSubmit: SubmitHandler<Inputs> = (values) => console.log(values);

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
    const allFormValues = getValues();
    const itemValuesArray = getItemValues(allFormValues);

    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...itemValuesArray, { name: "", quantity: "", price: "" }],
    }));
  };

  const deleteItemHandler = (index: number) => {
    
    setInvoiceData((prevData) => {
      const newItems = [
        ...prevData.items.slice(0, index),
        ...prevData.items.slice(index + 1),
      ];

      return {
        ...prevData,
        items: newItems,
      };
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      style={
        screenWidth > Size.modalBreakpoint
          ? { height: formHeight }
          : { height: "auto" }
      }
    >
      <div className={styles.formTop}>
        <div className={styles.mgBottom}>
          <h3 className={styles.formHeader}>Bill From</h3>
          <div className={styles.formElementWrapper}>
            <FormElement
              label="Street Address"
              {...register("supplierStreetAddress")}
            />
          </div>
          <div className={styles.gridArea}>
            <div className={styles.city}>
              <FormElement label="City" {...register("supplierCity")} />
            </div>
            <div className={styles.postCode}>
              <FormElement
                label="Post Code"
                {...register("supplierPostcode")}
              />
            </div>
            <div className={styles.country}>
              <FormElement label="Country" {...register("supplierCountry")} />
            </div>
          </div>
        </div>
        <div className={styles.mgBottom}>
          <h3 className={styles.formHeader}>Bill To</h3>
          <div className={styles.formElementWrapper}>
            <FormElement label="Client's Name" {...register("clientName")} />
          </div>
          <div className={styles.formElementWrapper}>
            <FormElement
              label="Client's Email"
              placeholder="e.g. email@example.com"
              {...register("clientEmail")}
            />
          </div>
          <div className={styles.formElementWrapper}>
            <FormElement
              label="Street Address"
              {...register("clientStreetAddress")}
            />
          </div>
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
            <div className={styles.formElementWrapper}>
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    field={{
                      ...field,
                      value: field.value ? new Date(field.value) : null,
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.formElementWrapper}>
              <Controller
                name="paymentTerms"
                control={control}
                render={({ field }) => (
                  <PaymentTermsPicker
                    options={[
                      "Net 1 Day",
                      "Net 7 Days",
                      "Net 14 Days",
                      "Net 30 Days",
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
          </div>
          <FormElement
            label="Project Description"
            placeholder="e.g. Graphic Design Service"
            {...register("project")}
          />
        </div>
        <div className={styles.addItemSection}>
          <h3 className={styles.listHeader}>Item List</h3>
          <ul className={styles.itemList}>
            {invoiceData.items.map((item, index) => (
              <li key={index} className={styles.itemRow}>
                <div className={styles.itemName}>
                  <FormElement
                    classNameCustom={
                      screenWidth < Size.modalBreakpoint
                        ? "displayBlock"
                        : screenWidth > Size.modalBreakpoint && index === 0
                        ? "displayBlock"
                        : "displayNone"
                    }
                    label="Item Name"
                    {...register(`name_${index}`)}
                  />
                </div>
                <div className={styles.itemFlexRow}>
                  <div className={styles.itemQty}>
                    <FormElement
                      classNameCustom={
                        screenWidth < Size.modalBreakpoint
                          ? "displayBlock"
                          : screenWidth > Size.modalBreakpoint && index === 0
                          ? "displayBlock"
                          : "displayNone"
                      }
                      label="Qty"
                      type="number"
                      min={1}
                      step={1}
                      {...register(`quantity_${index}`)}
                    />
                  </div>
                  <div className={styles.itemPrice}>
                    <FormElement
                      classNameCustom={
                        screenWidth < Size.modalBreakpoint
                          ? "displayBlock"
                          : screenWidth > Size.modalBreakpoint && index === 0
                          ? "displayBlock"
                          : "displayNone"
                      }
                      label="Price"
                      {...register(`price_${index}`)}
                    />
                  </div>
                  <div>
                    <label
                      className={
                        screenWidth < Size.modalBreakpoint
                          ? `${styles.label} displayBlock ${setThemeStyles(
                              "textSix"
                            )}`
                          : screenWidth > Size.modalBreakpoint && index === 0
                          ? `${styles.label} displayBlock ${setThemeStyles(
                              "textSix"
                            )}`
                          : `${styles.label} displayNone ${setThemeStyles(
                              "textSix"
                            )}`
                      }
                    >
                      Total
                    </label>
                    <p
                      className={`${styles.itemPriceTotal} ${setThemeStyles(
                        "textTwo"
                      )}`}
                    >
                      {Number(item.price) * Number(item.quantity)}
                    </p>
                  </div>
                  <div className={styles.deleteRow}>
                    <Image
                      style={{ cursor: "pointer" }}
                      className={styles.bin}
                      src={Bin}
                      alt="delete row"
                      onClick={() => deleteItemHandler(index)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Button
            description="+ Add New Item"
            buttonType={`${styles.addItem} ${setThemeStyles(
              "backgroundFive"
            )} ${setThemeStyles("textFour")}`}
            onClick={addItemHandler}
          />
        </div>
        {errors.supplierCity && <span>This field is required</span>}
      </div>
      <div style={{ maxWidth: bottomWidth + "px" }}>
        <div
          style={{ left: "0px", paddingLeft: bottomPaddingLeft + "px" }}
          className={`${styles.formBottom} ${setThemeStyles(
            "backgroundSeven"
          )} ${setThemeStyles("shadowOne")}`}
        >
          <Button
            description="Discard"
            buttonType={`${setThemeStyles("backgroundFive")} ${setThemeStyles(
              "textSix"
            )} ${styles.discard}`}
            onClick={handleDiscardInvoice}
          />
          <Button
            description="Save as Draft"
            buttonType={`${setThemeStyles("textTwo")} ${styles.saveDraft}`}
            onClick={handleSaveDraft}
          />
          <Button
            description="Create invoice"
            buttonType={styles.saveInvoice}
            onClick={handleCreateInvoice}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
