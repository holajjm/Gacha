import React from "react";

import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/Main/MainPage.module.css";

function MainPage() {
  usePageUpper();
  return (
    <div className={style.container}>
      <section className={style.wrapper}>MainPage</section>
    </div>
  );
}

export default MainPage;
