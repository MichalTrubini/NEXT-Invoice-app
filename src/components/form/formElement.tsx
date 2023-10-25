import { forwardRef, useContext } from "react";
import styles from "./formElement.module.css";
import { SiteContext } from "../../store/site-context";
import { MyInputProps } from "../../types/types";

const FormElement = forwardRef<HTMLInputElement, MyInputProps>(({label, min, type, step, classNameCustom, placeholder, ...rest }, ref) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  return (
    <>
      <label className={`${styles.label} ${classNameCustom} ${setThemeStyles("textSix")}`}>{label}</label>
      <input
        className={`${styles.input} ${setThemeStyles("placeholder")} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
          "borderOne"
        )}`}
        placeholder={placeholder}
        min={min}
        step={step}
        type={type}
        {...rest} ref={ref}
      />
    </>
  );
});

export default FormElement;
