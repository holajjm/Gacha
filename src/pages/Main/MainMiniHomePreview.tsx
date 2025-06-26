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
          src="/images/MiniHomeMain.webp"
          alt="MiniHomeMainPreview1"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MiniHomeMain1.webp"
          alt="MiniHomeMainPreview2"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MiniHomeItemBook.webp"
          alt="MiniHomeMainPreview3"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MiniHomeAdornBackground.webp"
          alt="MiniHomeMainPreview4"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MiniHomeAdornItem.webp"
          alt="MiniHomeMainPreview5"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainMiniHomePreview;
