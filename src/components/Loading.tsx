import React from "react";

import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/Layouts/Loading.module.css";

function Loading() {
  usePageUpper();
  return (
    <section className={style.wrapper}>
      <img src="/images/LoadingBar.gif" alt="loading" />
    </section>
  );
}

export default Loading;
