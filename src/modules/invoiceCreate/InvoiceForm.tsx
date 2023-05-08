import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./invoiceForm.module.css";
import { useContext } from "react";
import SiteContext from "../../store/site-context";

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

  const { setThemeStyles } = useContext(SiteContext);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formHeader}>Bill From</h3>
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Street Address</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("streetAddress", { required: true })}
      />
      <div className={styles.billBlock}>
        <div className={styles.city}>
          <label className={`${styles.label} ${setThemeStyles("textFour")}`}>City</label>
          <input
            className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles(
              "textOne"
            )} ${setThemeStyles("borderOne")}`}
            {...register("city", { required: true })}
          />
        </div>
        <div className={styles.postCode}>
          <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Post Code</label>
          <input
            className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles(
              "textOne"
            )} ${setThemeStyles("borderOne")}`}
            {...register("postcode", { required: true })}
          />
        </div>
        <div className={styles.country}>
          <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Country</label>
          <input
            className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles(
              "textOne"
            )} ${setThemeStyles("borderOne")}`}
            {...register("country", { required: true })}
          />
        </div>
      </div>

      <h3 className={styles.formHeader}>Bill To</h3>
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Client's Name</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("clientName", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Client's Email</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("clientEmail", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Street Address</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("streetAddress", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>City</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("city", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Post Code</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("postcode", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Country</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("country", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Invoice Date</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("invoiceDate", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Payment Terms</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("paymentTerms", { required: true })}
      />
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>Project Description</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...register("project", { required: true })}
      />

      <h3>Item List</h3>

      {errors.city && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default InvoiceForm;
