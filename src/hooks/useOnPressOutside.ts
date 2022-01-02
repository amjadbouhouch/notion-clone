import { useEffect, useState } from "react";

export default function useOnPressOutside(ref) {
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClickedOutside(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return { isClickedOutside };
}
