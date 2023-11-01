import { useContext, useEffect, useRef, useState } from "react";
import { DatePickerProps } from "../../types/types";
import { SiteContext } from "../../store/site-context";
import Calendar from "react-calendar";
import Image from "next/image";
import iconCalendar from "../../../public/assets/icon-calendar.svg";
import styles from "./datePicker.module.css";
import { formatDate } from "../../utils/functions";

const DatePicker: React.FC<DatePickerProps> = ({ field }) => {
  const { setThemeStyles } = useContext(SiteContext)!;
  const [dateClicked, setDateClicked] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !(datePickerRef.current as any).contains(event.target)
      ) {
        // Click occurred outside the DatePicker, so close the calendar
        setDateClicked(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={datePickerRef}>
      <label className={`${styles.label} ${setThemeStyles("textSix")}`}>
        Invoice date
      </label>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          readOnly
          value={formatDate(field.value)}
          onClick={() => setDateClicked((prev) => !prev)}
          onChange={(e) => {
            const selectedDate = e.target.value
              ? new Date(e.target.value)
              : null;
            field.onChange(selectedDate);
          }}
          className={`${styles.input} ${setThemeStyles(
            "backgroundThree"
          )} ${setThemeStyles("textOne")} ${setThemeStyles("borderOne")}`}
        />
        <Image
          src={iconCalendar}
          alt="calendar"
          className={styles.calendarIcon}
        />
      </div>
      {dateClicked && (
        <Calendar
          onChange={(date) => {
            if (date instanceof Date) {
              field.onChange(date);
            } else {
              field.onChange(null);
            }
            setDateClicked(false);
          }}
          value={formatDate(field.value)}
          className={`${styles.calendar} ${setThemeStyles("backgroundThree")}`}
          tileClassName={`${styles.calendarTile} ${setThemeStyles("textOne")}`}
          prev2Label={null}
          next2Label={null}
        />
      )}
    </div>
  );
};

export default DatePicker;
