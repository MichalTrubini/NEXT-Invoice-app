import { forwardRef, useContext } from "react";
import styles from "./formElement.module.css";
import { SiteContext } from "../../store/site-context";

interface MyInputProps {
  label: string;
  classNameCustom?: string
}

const FormElement = forwardRef<HTMLInputElement, MyInputProps>(({label, classNameCustom, ...rest }, ref) => {
  const { setThemeStyles } = useContext(SiteContext)!;

  return (
    <div>
      <label className={`${styles.label} ${classNameCustom} ${setThemeStyles("textSix")}`}>{label}</label>
      <input
        className={`${styles.input} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        {...rest} ref={ref}
      />
    </div>
  );
});

export default FormElement;
