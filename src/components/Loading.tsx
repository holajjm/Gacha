import React from "react";

import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/Layouts/Loading.module.css";

function Loading() {
  usePageUpper();
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.title}>
            <img src="/images/Loading.gif" alt="loading" />
          </h1>
        </header>
      </section>
    </div>
  );
}

export default Loading;
