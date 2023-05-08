import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./invoiceForm.module.css";
import { forwardRef, useContext } from "react";
import SiteContext from "../../store/site-context";
import FormElement from "../../components/form/formElement";

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
  qty: number;
  price: number;
};

const InvoiceForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const { setThemeStyles } = useContext(SiteContext);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formHeader}>Bill From</h3>
      <FormElement label="Street Address" {...register("streetAddress")} />
      <div className={styles.billBlock}>
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

      <h3 className={styles.formHeader}>Bill To</h3>
      <FormElement label="Client's Name" {...register("clientName")} />
      <FormElement label="Client's Email" {...register("clientEmail")} />
      <FormElement label="Street Address" {...register("clientStreetAddress")} />
      <FormElement label="City" {...register("clientCity")} />
      <FormElement label="Post Code" {...register("clientPostcode")} />
      <FormElement label="Country" {...register("clientCountry")} />
      <FormElement label="Invoice Date" {...register("invoiceDate")} />
      <FormElement label="Payment Terms" {...register("paymentTerms")} />
      <FormElement label="Project Description" {...register("project")} />

      <h3>Item List</h3>

      {errors.city && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default InvoiceForm;
