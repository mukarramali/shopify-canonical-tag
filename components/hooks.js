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
  const params = new URL(document.location).searchParams;
  const hash = {};
  params.forEach((value, key) => {
    hash[key] = value;
  });
  return hash;
};

export const useBlockDetection = () => {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {}, []);
  return isActive;
};
