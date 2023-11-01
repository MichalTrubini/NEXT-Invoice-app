import { useContext, useEffect, useRef, useState } from "react";
import { PaymentTermsPickerProps } from "../../types/types";
import { SiteContext } from "../../store/site-context";
import styles from "./paymentTermsPicker.module.css";
import iconArrow from "../../../public/assets/icon-arrow-down.svg";
import Image from "next/image";

const PaymentTermsPicker: React.FC<PaymentTermsPickerProps> = ({
  options,
  value,
  onChange,
}) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add a click event listener to the document to close the dropdown when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <label className={`${styles.label} ${setThemeStyles("textSix")}`}>
        Payment Terms
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          readOnly
          value={selectedValue}
          onChange={handleInputChange}
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.input} ${setThemeStyles(
            "backgroundThree"
          )} ${setThemeStyles("textOne")} ${setThemeStyles("borderOne")}`}
        />
        <Image
          src={iconArrow}
          alt="arrow"
          className={
            isOpen
              ? `${styles.arrowUp} ${styles.arrowIcon}`
              : `${styles.arrowDown} ${styles.arrowIcon}`
          }
        />
      </div>
      {isOpen && (
        <ul
          className={`${styles.dropdown} ${setThemeStyles("backgroundFour")}`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${styles.dropdownItem} ${setThemeStyles(
                "textOne"
              )} ${setThemeStyles("borderTwo")}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentTermsPicker;
