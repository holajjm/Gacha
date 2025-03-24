import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainTitle() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>
        Welcome to the
        <br />
        GACHAGACHA!
      </h1>
    </header>
  );
}

export default MainTitle;
