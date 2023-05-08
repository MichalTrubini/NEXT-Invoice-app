import { useContext } from "react";
import styles from "./formElement.module.css";
import SiteContext from "../../store/site-context";
import { useForm } from "react-hook-form";

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

const FormElement: React.FC<{label: string}> = (props) => {
  const { setThemeStyles } = useContext(SiteContext);

  return (
    <div>
      <label className={`${styles.label} ${setThemeStyles("textFour")}`}>{props.label}</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
      />
    </div>
  );
};

export default FormElement;
