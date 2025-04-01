import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainExplorePreview() {
  return (
    <article className={style.article}>
      <h1>Explore</h1>
      <div className={style.img_preview}>
        <img src="/images/Explore.svg" alt="" />
      </div>
    </article>
  );
}

export default MainExplorePreview;
