import React from "react";

import style from "@styles/Main/MainPage.module.css";


function MainGachaPreview() {
  return (
    <article className={style.article}>
      <h1>Gacha</h1>
      <div className={style.img_preview}>
        <img src="/images/Gacha.svg" alt="" />
        <img src="/images/GachaClose.svg" alt="" />
        <img src="/images/GachaOpen.svg" alt="" />
      </div>
    </article>
  );
}

export default MainGachaPreview;
