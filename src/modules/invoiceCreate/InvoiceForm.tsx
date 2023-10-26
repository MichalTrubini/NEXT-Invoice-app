import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "./invoiceForm.module.css";
import FormElement from "../../components/form/FormElement";
import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../store/site-context";
import { Size } from "../../types/enums";
import { useScreenWidth } from "../../utils/hooks";
import Image from "next/image";
import Bin from "../../../public/assets/icon-delete.svg";
import "react-calendar/dist/Calendar.css";
import { Inputs, InvoiceData, MyNativeEvent } from "../../types/types";
import { getItemValues, getDefaultValues } from "../../utils/functions";
import PaymentTermsPicker from "../../components/form/PaymentTermsPicker";
import DatePicker from "../../components/form/DatePicker";

const InvoiceForm: React.FC<{ close: any; data: InvoiceData }> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const screenWidth = useScreenWidth();

  const [formHeight, setFormHeight] = useState(0);
  const [bottomWidth, setBottomWidth] = useState(0);
  const [bottomPaddingLeft, setBottomPaddingLeft] = useState(0);
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

  const formDefaultValues = getDefaultValues(invoiceData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
    watch,
  } = useForm<Inputs>({
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    reset(formDefaultValues);
  }, [invoiceData, reset]);

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

  const mapToPayload = (data: Inputs) => {
    const payload = {
      description: data.project,
      senderAddress: {
        street: data.supplierStreetAddress,
        city: data.supplierCity,
        postCode: data.supplierPostcode,
        country: data.supplierCountry,
      },
      clientAddress: {
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostcode,
        country: data.clientCountry,
      },
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      createdAt: data.invoiceDate,
      paymentDue: data.paymentTerms,
      items: invoiceData.items,
    };

    return payload;
  };

  const [isError, setIsError] = useState({
    supplierCity: false,
    supplierPostcode: false,
    supplierCountry: false,
    supplierStreetAddress: false,
    clientName: false,
    clientEmail: false,
    clientStreetAddress: false,
    clientCity: false,
    clientPostcode: false,
    clientCountry: false,
    project: false,
  });
  console.log(isError);
  const validateForm = (data: Inputs) => {
    const requiredFields = [
      "supplierCity",
      "supplierPostcode",
      "supplierCountry",
      "supplierStreetAddress",
      "clientName",
      "clientEmail",
      "clientStreetAddress",
      "clientCity",
      "clientPostcode",
      "clientCountry",
      "project",
    ];

    let errors = false;

    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors = true;
        setIsError((prevState) => ({ ...prevState, [field]: true }));
      } else {
        setIsError((prevState) => ({ ...prevState, [field]: false }));
      }
    });

    return errors;
  };

  const onSubmit: SubmitHandler<Inputs> = (values, event) => {
    if (event && event.nativeEvent) {
      const buttonName = (event.nativeEvent as MyNativeEvent).submitter?.name;

      if (buttonName === "discardButton") {
        props.close();
      } else if (buttonName === "draftButton") {
        mapToPayload(values);
        console.log("draft");
      } else if (buttonName === "saveButton") {
        if (validateForm(values)) {
          console.log("error", values);
          return;
        }
        mapToPayload(values);
      }
    }
  };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setIsError((prevState) => ({ ...prevState, [name as string]: false }));
      console.log(name);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const addItemHandler = () => {
    const allFormValues = getValues();
    const itemValuesArray = getItemValues(allFormValues);

    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...itemValuesArray, { name: "", quantity: "", price: "" }],
    }));
  };

  const deleteItemHandler = (index: number) => {
    const allFormValues = getValues();
    const itemValuesArray = getItemValues(allFormValues);
    setInvoiceData((prevData) => {
      const newItems = [
        ...itemValuesArray.slice(0, index),
        ...itemValuesArray.slice(index + 1),
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
            {isError.supplierStreetAddress && (
              <p className={styles.errorMessage}>cant't be empty</p>
            )}
            <FormElement
              label="Street Address"
              {...register("supplierStreetAddress")}
            />
          </div>
          <div className={styles.gridArea}>
            <div className={styles.city}>
              {isError.supplierCity && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement label="City" {...register("supplierCity")} />
            </div>
            <div className={styles.postCode}>
              {isError.supplierPostcode && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
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
            name="discardButton"
          />
          <Button
            description="Save as Draft"
            buttonType={`${setThemeStyles("textTwo")} ${styles.saveDraft}`}
            name="draftButton"
          />
          <Button
            description="Save & Send"
            buttonType={styles.saveInvoice}
            name="saveButton"
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
