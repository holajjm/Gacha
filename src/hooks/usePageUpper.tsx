import { useEffect } from "react";

function usePageUpper() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default usePageUpper;
