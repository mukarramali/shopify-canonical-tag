import gql from "graphql-tag";
import { useEffect } from "react";
import { useQuery } from "react-apollo";

export const LanguageContext = React.createContext(undefined);

const GET_LOCALE = gql`
  query shopLocales() {
    shopLocales() {
      primary
    }
  }
`;

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = React.useState();
  const { data } = useQuery(GET_LOCALE);
  useEffect(() => console.log({ locale: data }), [data]);
  return (
    <LanguageContext.Provider value={locale}>
      {children}
    </LanguageContext.Provider>
  );
};
