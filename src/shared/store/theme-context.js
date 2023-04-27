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
        backgroundOne: "b-f8f8fb",
        backgroundTwo: "b-373b53",
        backgroundThree: "b-ffffff",
        backgroundFour: 'b-ffffff',
        backgroundFive: 'b-F9FAFE',
        backgroundSix: 'b-373b53',
        textOne: "c-0c0e16",
        textTwo: "c-888eb0",
        textThree: "c-858bb2",
        textFour: 'c-7E88C3',
        draft: 'background-draft-lightTheme',
        draftCircle: 'background-draftCircle-lightTheme',
        
      },
      themeDark: {
        backgroundOne: "b-141625",
        backgroundTwo: "b-1e2139",
        backgroundThree: "b-1e2139",
        backgroundFour: 'b-252945',
        backgroundFive: 'b-252945',
        backgroundSix: 'b-0c0e16',
        textOne: "c-ffffff",
        textTwo: "c-dfe3fa",
        textThree: "c-ffffff",
        textFour: 'c-888eb0',
        draft: 'background-draft-darkTheme',
        draftCircle: 'background-draftCircle-darkTheme',
        
        
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