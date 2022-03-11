import { useCallback, useEffect } from "react";

export const LanguageContext = React.createContext("en");
const LocalStorageKey = "canonical-tag-app-language";

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = React.useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LocalStorageKey);
    if (savedLanguage) {
      setLocale(savedLanguage);
    }
  }, []);

  const changeLanguage = useCallback(
    (value) => {
      setLocale(value);
      localStorage.setItem(LocalStorageKey, value);
    },
    [setLocale]
  );

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
