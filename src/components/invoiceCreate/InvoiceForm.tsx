import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./invoiceForm.module.css";

type Inputs = {
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  clientName: string;
  clientEmail: string;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formHeader}>Bill From</h3>
      <label className={styles.label}>Street Address</label>
      <input className={styles.input} {...register("streetAddress", { required: true })} />
      <div className={styles.billBlock}>
        <div className={styles.city}>
          <label className={styles.label}>City</label>
          <input className={styles.input} {...register("city", { required: true })} />
        </div>
        <div className={styles.postCode}>
          <label className={styles.label}>Post Code</label>
          <input className={styles.input} {...register("postcode", { required: true })} />
        </div>
        <div className={styles.country}>
          <label className={styles.label}>Country</label>
          <input className={styles.input} {...register("country", { required: true })} />
        </div>
      </div>

      <h3 className={styles.formHeader}>Bill To</h3>
      <label className={styles.label}>Client's Name</label>
      <input className={styles.input} {...register("clientName", { required: true })} />
      <label className={styles.label}>Client's Email</label>
      <input className={styles.input} {...register("clientEmail", { required: true })} />
      <label className={styles.label}>Street Address</label>
      <input className={styles.input} {...register("streetAddress", { required: true })} />
      <label className={styles.label}>City</label>
      <input className={styles.input} {...register("city", { required: true })} />
      <label className={styles.label}>Post Code</label>
      <input className={styles.input} {...register("postcode", { required: true })} />
      <label className={styles.label}>Country</label>
      <input className={styles.input} {...register("country", { required: true })} />
      <label className={styles.label}>Invoice Date</label>
      <input className={styles.input} {...register("invoiceDate", { required: true })} />
      <label className={styles.label}>Payment Terms</label>
      <input className={styles.input} {...register("paymentTerms", { required: true })} />
      <label className={styles.label}>Project Description</label>
      <input className={styles.input} {...register("project", { required: true })} />

      <h3>Item List</h3>

      {errors.city && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default InvoiceForm;
