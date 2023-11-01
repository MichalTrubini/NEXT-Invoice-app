import { forwardRef, useContext } from "react";
import styles from "./FormElement.module.css";
import { SiteContext } from "../../store/site-context";
import { MyInputProps } from "../../types/types";

const FormElement = forwardRef<HTMLInputElement, MyInputProps>(({label, min, type, step, labelCustomClass, inputCustomClass, placeholder, ...rest }, ref) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  return (
    <>
      <label className={`${styles.label} ${labelCustomClass} ${setThemeStyles("textSix")}`}>{label}</label>
      <input
        className={`${styles.input} ${inputCustomClass} ${setThemeStyles("placeholder")} ${setThemeStyles("backgroundThree")} ${setThemeStyles("textOne")} ${setThemeStyles(
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

FormElement.displayName = "FormElement";

export default FormElement;
