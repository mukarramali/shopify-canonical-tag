import gql from "graphql-tag";
import { useEffect } from "react";
import { useQuery } from "react-apollo";

export const LanguageContext = React.createContext(undefined);

// https://github.com/Shopify/quilt/tree/main/packages/react-i18n#translation
const GET_LOCALE = gql`
  query shopLocales($published: Boolean!) {
    shopLocales(published: $published) {
      primary
      locale
    }
  }
`;

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = React.useState();
  const { data } = useQuery(GET_LOCALE, {
    variables: {
      published: true,
    },
  });
  useEffect(() => {
    if (data) {
      const defaultLocale = data.shopLocales.find((l) => l.primary);
      setLocale(defaultLocale.locale);
    }
  }, [data]);
  return (
    <LanguageContext.Provider value={locale}>
      {children}
    </LanguageContext.Provider>
  );
};
