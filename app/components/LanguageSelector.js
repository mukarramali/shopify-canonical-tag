import { Select } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "../hooks";
import { locales, useTranslations } from "../i18n";

export function LanguageSelector() {
  const [selected, setSelected] = useState("en");
  const t = useTranslations();
  const locale = useLocale();
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  useEffect(() => {
    if (locale) {
      setSelected(locale);
    }
  }, [locale]);

  return (
    <Select
      label={t("language")}
      options={locales}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
