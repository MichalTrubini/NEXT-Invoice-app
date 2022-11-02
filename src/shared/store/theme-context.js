import React, { useState } from "react";

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const setThemeStyles = (arg) => {
    const styles = {
      themeLight: {
        backgroundMain: "background-main-lightTheme",
        headerBackground: "header-color-lightTheme",
        textOne: "text-colorOne-lightTheme",
        textTwo: "text-colorTwo-lightTheme",
        textThree: "text-colorThree-lightTheme",
        invoiceItem: "background-invoice-lightTheme",
        draft: 'background-draft-lightTheme',
        draftCircle: 'background-draftCircle-lightTheme'
      },
      themeDark: {
        backgroundMain: "background-main-darkTheme",
        headerBackground: "header-color-darkTheme",
        textOne: "text-colorOne-darkTheme",
        textTwo: "text-colorTwo-darkTheme",
        textThree: "text-colorThree-darkTheme",
        invoiceItem: "background-invoice-DarkTheme",
        draft: 'background-draft-darkTheme',
        draftCircle: 'background-draftCircle-darkTheme'
      }
    };

    if (darkTheme === false) {
      return styles.themeLight[arg];
    }
    if (darkTheme === true) {
      return styles.themeDark[arg];
    }
  };

  return <ThemeContext.Provider value={{ darkTheme, setDarkTheme, setThemeStyles }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
