import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMiniHomePreview() {
  return (
    <article className={style.article}>
      <h1>MiniHome</h1>
      <div className={style.img_preview}>
        <img src="src/assets/images/MiniHomeMain.svg" alt="" />
        <img src="src/assets/images/MiniHomeMain1.svg" alt="" />
        <img src="src/assets/images/MiniHomeItemBook.svg" alt="" />
        <img src="src/assets/images/MiniHomeAdornBackground.svg" alt="" />
        <img src="src/assets/images/MiniHomeAdornItem.svg" alt="" />
      </div>
    </article>
  );
}

export default MainMiniHomePreview;
