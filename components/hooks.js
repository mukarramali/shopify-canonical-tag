import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { EXTENSION_UUID } from "./environment";
import { LanguageContext } from "./LaguageProvider";

export default function usePrevProps(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 *
 * @returns Search params as hash, arrays are not supported yet
 */
export const useSearchParams = () => {
  const [hash, setHash] = useState({});

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const _hash = {};
    params.forEach((value, key) => {
      _hash[key] = value;
    });
    setHash(_hash);
  }, []);

  return hash;
};

export const useLocale = useContext(LanguageContext);

export const useBlockDetection = () => {
  const [isActive, setIsActive] = useState(true);
  const { shop = "" } = useSearchParams();
  useEffect(() => {
    if (shop) {
      axios
        .get(`/api/theme/assets/blocks/${shop}`)
        .then((response) => response.data)
        .then(({ blocks }) => {
          const disabled =
            blocks?.[
              Object.keys(blocks).find((blockId) =>
                blocks[blockId].type.match(new RegExp(EXTENSION_UUID))
              )
            ]?.disabled;
          setIsActive(disabled === false);
        });
    }
  }, [shop]);
  return isActive;
};
