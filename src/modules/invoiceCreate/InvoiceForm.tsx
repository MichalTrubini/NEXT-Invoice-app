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
import {
  getItemsArray,
  getDefaultValues,
  convertDateToString,
} from "../../utils/functions";
import PaymentTermsPicker from "../../components/form/PaymentTermsPicker";
import DatePicker from "../../components/form/DatePicker";

const InvoiceForm: React.FC<{ close: any; data: InvoiceData }> = (props) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const screenWidth = useScreenWidth();

  //STATES

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

  const [isError, setIsError] = useState({
    supplierCity: false,
    supplierPostcode: false,
    supplierCountry: false,
    supplierStreetAddress: false,
    clientName: false,
    clientEmail: false,
    clientEmailFormat: false,
    clientStreetAddress: false,
    clientCity: false,
    clientPostcode: false,
    clientCountry: false,
    project: false,
    items: [] as Array<{ name: boolean; quantity: boolean; price: boolean }>,
  });

  const formDefaultValues = getDefaultValues(invoiceData);

  const { register, handleSubmit, control, reset, getValues, watch } =
    useForm<Inputs>({
      defaultValues: formDefaultValues,
    });

  //EFFECTS

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

  useEffect(() => {
    setIsError((prevIsError) => ({
      ...prevIsError,
      items: [
        ...prevIsError.items,
        {
          name: false,
          quantity: false,
          price: false,
        },
      ],
    }));
  }, [invoiceData.items]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setIsError((prevState) => ({ ...prevState, [name as string]: false }));
      name === "clientEmail" &&
        setIsError((prevState) => ({ ...prevState, clientEmailFormat: false }));
      if (
        name &&
        (name.includes("name") ||
          name.includes("quantity") ||
          name.includes("price"))
      ) {
        const index = Number(name!.split("_")[1]);
        setIsError((prevState) => {
          const newItems = [...prevState.items];
          (newItems[index] as { [key: string]: boolean })[name.split("_")[0]] =
            false;
          return {
            ...prevState,
            items: newItems,
          };
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

  function getItemValueBoolean(name: string, index: number) {
    let error = false;

    if (isError.items.length > 0 && isError.items[index]) {
      error = (isError.items[index] as { [key: string]: boolean })[name];
    }

    return error;
  }

  const hasAtLeastOneError = Object.values(isError).some(
    (value) => value === true
  );

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
    const updatedIsError: any = { ...isError };
    let errors = false;
    const regex =
      /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;

    requiredFields.forEach((field) => {
      if (data[field] === "") {
        errors = true;
        updatedIsError[field] = true;
      } else if (regex.test(data.clientEmail) === false) {
        errors = true;
        updatedIsError.clientEmailFormat = true;
      } else {
        errors = false;
        updatedIsError[field] = false;
      }
    });
    const allFormValues = getValues();
    const itemValuesArray = getItemsArray(allFormValues);

    updatedIsError.items = itemValuesArray.map((item) => ({
      name: item.name === "",
      quantity: item.quantity === "",
      price: item.price === "",
    }));
    console.log("updatedIsError", updatedIsError);

    setIsError(updatedIsError);
    return errors;
  };

  const onSubmit: SubmitHandler<Inputs> = (values, event) => {
    const trimmedData: Inputs = {
      supplierStreetAddress: "",
      supplierCity: "",
      supplierPostcode: "",
      supplierCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientPostcode: "",
      clientCountry: "",
      invoiceDate: "",
      paymentTerms: "",
      project: "",
    };
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        trimmedData[key] = convertDateToString(values[key]).trim();
      }
    }

    if (event && event.nativeEvent) {
      const buttonName = (event.nativeEvent as MyNativeEvent).submitter?.name;

      if (buttonName === "discardButton") {
        props.close();
      } else if (buttonName === "draftButton") {
        const dataAPI = mapToPayload(trimmedData);
        console.log(dataAPI)
      } else if (buttonName === "saveButton") {
        if (validateForm(trimmedData)) {
          return;
        }

        //mapToPayload(values);
      }
    }
  };

  const addItemHandler = () => {
    const allFormValues = getValues();
    const itemValuesArray = getItemsArray(allFormValues);

    setInvoiceData({
      description: allFormValues.project,
      senderAddress: {
        street: allFormValues.supplierStreetAddress,
        city: allFormValues.supplierCity,
        postCode: allFormValues.supplierPostcode,
        country: allFormValues.supplierCountry,
      },
      createdAt: allFormValues.invoiceDate,
      paymentDue: '',
      clientAddress: {
        street: allFormValues.clientStreetAddress,
        city: allFormValues.clientCity,
        postCode: allFormValues.clientPostcode,
        country: allFormValues.clientCountry,
      },
      clientName: allFormValues.clientName,
      clientEmail: allFormValues.clientEmail,
      items: [...itemValuesArray, { name: "", quantity: "", price: "" }],
    });
  };

  const deleteItemHandler = (index: number) => {
    const allFormValues = getValues();
    const itemValuesArray = getItemsArray(allFormValues);
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
      autoComplete="off"
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
              labelCustomClass={
                isError.supplierStreetAddress ? "errorLabel" : ""
              }
              inputCustomClass={
                isError.supplierStreetAddress ? "errorInput" : ""
              }
              {...register("supplierStreetAddress")}
            />
          </div>
          <div className={styles.gridArea}>
            <div className={styles.city}>
              {isError.supplierCity && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="City"
                labelCustomClass={isError.supplierCity ? "errorLabel" : ""}
                inputCustomClass={isError.supplierCity ? "errorInput" : ""}
                {...register("supplierCity")}
              />
            </div>
            <div className={styles.postCode}>
              {isError.supplierPostcode && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="Post Code"
                labelCustomClass={isError.supplierPostcode ? "errorLabel" : ""}
                inputCustomClass={isError.supplierPostcode ? "errorInput" : ""}
                {...register("supplierPostcode")}
              />
            </div>
            <div className={styles.country}>
              {isError.supplierCountry && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="Country"
                labelCustomClass={isError.supplierCountry ? "errorLabel" : ""}
                inputCustomClass={isError.supplierCountry ? "errorInput" : ""}
                {...register("supplierCountry")}
              />
            </div>
          </div>
        </div>
        <div className={styles.mgBottom}>
          <h3 className={styles.formHeader}>Bill To</h3>
          <div className={styles.formElementWrapper}>
            {isError.clientName && (
              <p className={styles.errorMessage}>cant't be empty</p>
            )}
            <FormElement
              label="Client's Name"
              labelCustomClass={isError.clientName ? "errorLabel" : ""}
              inputCustomClass={isError.clientName ? "errorInput" : ""}
              {...register("clientName")}
            />
          </div>
          <div className={styles.formElementWrapper}>
            {isError.clientEmail && (
              <p className={styles.errorMessage}>cant't be empty</p>
            )}
            {isError.clientEmailFormat && (
              <p className={styles.errorMessage}>wrong format</p>
            )}
            <FormElement
              label="Client's Email"
              placeholder="e.g. email@example.com"
              labelCustomClass={
                isError.clientEmail || isError.clientEmailFormat
                  ? "errorLabel"
                  : ""
              }
              inputCustomClass={
                isError.clientEmail || isError.clientEmailFormat
                  ? "errorInput"
                  : ""
              }
              {...register("clientEmail")}
            />
          </div>
          <div className={styles.formElementWrapper}>
            {isError.clientStreetAddress && (
              <p className={styles.errorMessage}>cant't be empty</p>
            )}
            <FormElement
              label="Street Address"
              labelCustomClass={isError.clientStreetAddress ? "errorLabel" : ""}
              inputCustomClass={isError.clientStreetAddress ? "errorInput" : ""}
              {...register("clientStreetAddress")}
            />
          </div>
          <div className={styles.gridArea}>
            <div className={styles.city}>
              {isError.clientCity && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="City"
                labelCustomClass={isError.clientCity ? "errorLabel" : ""}
                inputCustomClass={isError.clientCity ? "errorInput" : ""}
                {...register("clientCity")}
              />
            </div>
            <div className={styles.postCode}>
              {isError.clientPostcode && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="Post Code"
                labelCustomClass={isError.clientPostcode ? "errorLabel" : ""}
                inputCustomClass={isError.clientPostcode ? "errorInput" : ""}
                {...register("clientPostcode")}
              />
            </div>
            <div className={styles.country}>
              {isError.clientCountry && (
                <p className={styles.errorMessage}>cant't be empty</p>
              )}
              <FormElement
                label="Country"
                labelCustomClass={isError.clientCountry ? "errorLabel" : ""}
                inputCustomClass={isError.clientCountry ? "errorInput" : ""}
                {...register("clientCountry")}
              />
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
          <div className={styles.formElementWrapper}>
            {isError.clientCountry && (
              <p className={styles.errorMessage}>cant't be empty</p>
            )}
            <FormElement
              label="Project Description"
              placeholder="e.g. Graphic Design Service"
              labelCustomClass={isError.project ? "errorLabel" : ""}
              inputCustomClass={isError.project ? "errorInput" : ""}
              {...register("project")}
            />
          </div>
        </div>
        <div className={styles.addItemSection}>
          <h3 className={styles.listHeader}>Item List</h3>
          <ul className={styles.itemList}>
            {invoiceData.items.map((item, index) => (
              <li key={index} className={styles.itemRow}>
                <div className={styles.itemName}>
                  <FormElement
                    labelCustomClass={
                      screenWidth < Size.modalBreakpoint
                        ? "displayBlock"
                        : screenWidth > Size.modalBreakpoint && index === 0
                        ? "displayBlock"
                        : "displayNone"
                    }
                    inputCustomClass={
                      getItemValueBoolean("name", index) ? "errorInput" : ""
                    }
                    label="Item Name"
                    {...register(`name_${index}`)}
                  />
                </div>
                <div className={styles.itemFlexRow}>
                  <div className={styles.itemQty}>
                    <FormElement
                      labelCustomClass={
                        screenWidth < Size.modalBreakpoint
                          ? "displayBlock"
                          : screenWidth > Size.modalBreakpoint && index === 0
                          ? "displayBlock"
                          : "displayNone"
                      }
                      inputCustomClass={
                        getItemValueBoolean("quantity", index)
                          ? "errorInput"
                          : ""
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
                      labelCustomClass={
                        screenWidth < Size.modalBreakpoint
                          ? "displayBlock"
                          : screenWidth > Size.modalBreakpoint && index === 0
                          ? "displayBlock"
                          : "displayNone"
                      }
                      inputCustomClass={
                        getItemValueBoolean("price", index) ? "errorInput" : ""
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
          {hasAtLeastOneError && (
            <p className={styles.errorMessageGeneric}>
              - All fields must be added
            </p>
          )}
        </div>
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
