import { useCallback } from "react";

export const LanguageContext = React.createContext("en");

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = React.useState("en");

  const changeLanguage = useCallback(
    (value) => {
      setLocale(value);
    },
    [setLocale]
  );

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
