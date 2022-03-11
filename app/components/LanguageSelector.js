import { Select } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "../hooks";
import { locales, useTranslations } from "../i18n";

export function LanguageSelector() {
  const [selected, setSelected] = useState("en");
  const t = useTranslations();
  const { locale, changeLanguage } = useLocale();
  const handleSelectChange = useCallback((value) => changeLanguage(value), []);

  useEffect(() => {
    if (locale) {
      setSelected(locale);
    }
  }, [locale]);

  return (
    <Select
      label={t("language")}
      labelInline={true}
      options={locales}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
