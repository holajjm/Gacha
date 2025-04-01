import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMiniHomePreview() {
  return (
    <article className={style.article}>
      <h1>MiniHome</h1>
      <div className={style.img_preview}>
        <img src="/images/MiniHomeMain.svg" alt="" />
        <img src="/images/MiniHomeMain1.svg" alt="" />
        <img src="/images/MiniHomeItemBook.svg" alt="" />
        <img src="/images/MiniHomeAdornBackground.svg" alt="" />
        <img src="/images/MiniHomeAdornItem.svg" alt="" />
      </div>
    </article>
  );
}

export default MainMiniHomePreview;
