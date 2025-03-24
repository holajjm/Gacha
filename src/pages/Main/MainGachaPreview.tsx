import React from "react";

import style from "@styles/Main/MainPage.module.css";


function MainGachaPreview() {
  return (
    <article className={style.article}>
      <h1>Gacha</h1>
      <div className={style.img_preview}>
        <img src="src/assets/images/Gacha.svg" alt="" />
        <img src="src/assets/images/GachaClose.svg" alt="" />
        <img src="src/assets/images/GachaOpen.svg" alt="" />
      </div>
    </article>
  );
}

export default MainGachaPreview;
