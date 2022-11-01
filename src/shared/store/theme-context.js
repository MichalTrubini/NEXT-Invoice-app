import React, { useState } from "react";

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const setThemeStyles = (arg) => {
    const styles = {
      themeLight: {
        backgroundMain: "background-main-light",
        headerBackground: "header-color-light",
        backgroundToggle: "background-toggle-one",
        screenProps: "screen-props-one",
        backgroundKeyboard: "background-keyboard-one",
        backgroundSwitcher: "background-switcher-one",
        keyProps: "key-props-one",
        delProps: "del-props-one",
        resultProps: "result-props-one",
      },
      themeDark: {
        backgroundMain: "background-main-dark",
        headerBackground: "header-color-dark",
        backgroundToggle: "background-toggle-two",
        screenProps: "screen-props-two",
        backgroundKeyboard: "background-keyboard-two",
        backgroundSwitcher: "background-switcher-two",
        keyProps: "key-props-two",
        delProps: "del-props-two",
        resultProps: "result-props-two",
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
