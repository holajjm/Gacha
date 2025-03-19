import React from "react";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/Main/MainPage.module.css";

function MainPage() {
  usePageTitle("GachaGacha");
  usePageUpper();
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.title}>
            Welcome to the
            <br />
            GACHAGACHA!
          </h1>
        </header>
      </section>
    </div>
  );
}

export default MainPage;
