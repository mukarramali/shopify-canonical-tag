import axios from "axios";
import { useEffect, useRef, useState } from "react";

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

export const useBlockDetection = () => {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    axios
      .get("/api/theme/assets")
      .then((response) => response.data)
      .then((data) => console.log({ data }));
  }, []);
  return isActive;
};
