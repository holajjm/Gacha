import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMiniHomePreview({
  article2Ref,
}: {
  article2Ref: Ref<HTMLDivElement>;
}) {
  return (
    <article ref={article2Ref} className={style.article}>
      <h3>미니홈</h3>
      <div className={style.img_preview}>
        <img
          src="/images/MiniHomeMain.svg"
          alt="MiniHomeMainPreview1"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MiniHomeMain1.svg"
          alt="MiniHomeMainPreview2"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MiniHomeItemBook.svg"
          alt="MiniHomeMainPreview3"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MiniHomeAdornBackground.svg"
          alt="MiniHomeMainPreview4"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MiniHomeAdornItem.svg"
          alt="MiniHomeMainPreview5"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainMiniHomePreview;
