import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainGachaPreview({
  article4Ref,
}: {
  article4Ref: Ref<HTMLDivElement>;
}) {
  return (
    <article ref={article4Ref} className={style.article}>
      <h3>가챠 뽑기</h3>
      <div className={style.img_preview}>
        <img
          src="/images/Gacha.webp"
          alt="GachaPreview1"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/GachaClose.webp"
          alt="GachaPreview2"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/GachaOpen.webp"
          alt="GachaPreview3"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainGachaPreview;
