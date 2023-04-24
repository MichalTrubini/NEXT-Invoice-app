/* import React, { useState, createContext } from "react";

interface ThemeStyles {
  backgroundMain: string;
  headerBackground: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  invoiceItem: string;
  draft: string;
  draftCircle: string;
}

interface Styles {
  themeLight: ThemeStyles;
  themeDark: ThemeStyles;
}

interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: (arg0: boolean) => void;
  setThemeStyles: (arg0: keyof ThemeStyles) => string;
}

const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => {},
  setThemeStyles: () => "",
}); 

export const ThemeProvider:React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const setThemeStyles = (arg: keyof ThemeStyles) => {
    const styles: Styles = {
      themeLight: {
        backgroundMain: "background-main-lightTheme",
        headerBackground: "header-color-lightTheme",
        textOne: "text-colorOne-lightTheme",
        textTwo: "text-colorTwo-lightTheme",
        textThree: "text-colorThree-lightTheme",
        invoiceItem: "background-invoice-lightTheme",
        draft: "background-draft-lightTheme",
        draftCircle: "background-draftCircle-lightTheme",
      },
      themeDark: {
        backgroundMain: "background-main-darkTheme",
        headerBackground: "header-color-darkTheme",
        textOne: "text-colorOne-darkTheme",
        textTwo: "text-colorTwo-darkTheme",
        textThree: "text-colorThree-darkTheme",
        invoiceItem: "background-invoice-DarkTheme",
        draft: "background-draft-darkTheme",
        draftCircle: "background-draftCircle-darkTheme",
      },
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
 */

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