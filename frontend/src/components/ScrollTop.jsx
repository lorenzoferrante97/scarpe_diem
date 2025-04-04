import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollTop() {
  const { pathname } = useLocation();
  //! Si attiva ogni volta che cambia il pathname
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
