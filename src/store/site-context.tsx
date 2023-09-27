import React, { useState, createContext, ReactNode } from "react";

interface ThemeStyles {
  backgroundOne: string;
  backgroundTwo: string;
  backgroundThree: string;
  backgroundFour: string;
  backgroundFive: string;
  backgroundSix: string;
  backgroundSeven: string;
  backgroundEight: string;
  backgroundNine: string;
  backgroundTen: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  textFour: string;
  textFive: string;
  textSix: string;
  borderOne: string;
  borderTwo: string;
  shadowOne: string;
  placeholder: string;
}

interface SiteContextValue {
  darkTheme: boolean;
  newInvoice: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
  setThemeStyles: (arg: keyof ThemeStyles) => string;
  setNewInvoice: (newInvoice: boolean) => void;
}

export const SiteContext = createContext<SiteContextValue | undefined>(undefined);

interface SiteProviderProps {
  children: ReactNode;
}

export function SiteProvider({ children }: SiteProviderProps) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [newInvoice, setNewInvoice] = useState<boolean>(false);

  const setThemeStyles = (arg: keyof ThemeStyles): string => {
    const styles: { [key: string]: ThemeStyles } = {
      themeLight: {
        backgroundOne: "b-f8f8fb",
        backgroundTwo: "b-373b53",
        backgroundThree: "b-ffffff",
        backgroundFour: 'b-ffffff',
        backgroundFive: 'b-F9FAFE',
        backgroundSix: 'b-373b53',
        backgroundSeven: 'b-ffffff',
        backgroundEight: 'b-f3f3f3',
        backgroundNine: 'b-373b53',
        backgroundTen: 'b-dfe3fa',
        textOne: "c-0c0e16",
        textTwo: "c-888eb0",
        textThree: "c-858bb2",
        textFour: 'c-7E88C3',
        textFive:'c-373b53',
        textSix:'c-7E88C3',
        borderOne: 'br-DFE3FA',
        borderTwo: 'brb-DFE3FA',
        shadowOne: 'shadowOne-light',
        placeholder: 'placeholder-light'
      },
      themeDark: {
        backgroundOne: "b-141625",
        backgroundTwo: "b-1e2139",
        backgroundThree: "b-1e2139",
        backgroundFour: 'b-252945',
        backgroundFive: 'b-252945',
        backgroundSix: 'b-0c0e16',
        backgroundSeven: 'b-141625',
        backgroundEight: 'b-373b53',
        backgroundNine: 'b-dfe3fa',
        backgroundTen: 'b-1e2139',
        textOne: "c-ffffff",
        textTwo: "c-dfe3fa",
        textThree: "c-ffffff",
        textFour: 'c-888eb0',
        textFive:'c-dfe3fa',
        textSix:'c-dfe3fa',
        borderOne: 'br-252945',
        borderTwo: 'brb-1E2139',
        shadowOne: 'shadowOne-dark',
        placeholder: 'placeholder-dark'
      }
    };

    if (darkTheme === false) {
      return styles.themeLight[arg];
    }
    if (darkTheme === true) {
      return styles.themeDark[arg];
    }

    return "";
  };

  return (
    <SiteContext.Provider value={{ darkTheme, newInvoice, setDarkTheme, setThemeStyles, setNewInvoice }}>
      {children}
    </SiteContext.Provider>
  );
}