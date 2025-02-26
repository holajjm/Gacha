import { useEffect } from "react";

function usePageTitle(title: string) {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
}

export default usePageTitle;
