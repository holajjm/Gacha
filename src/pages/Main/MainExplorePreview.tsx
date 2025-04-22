import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainExplorePreview({
  article3Ref,
}: {
  article3Ref: Ref<HTMLDivElement>;
}) {
  return (
    <article ref={article3Ref} className={style.article}>
      <h3>둘러보기</h3>
      <div className={style.img_preview}>
        <img
          src="/images/Explore.webp"
          alt="ExplorePreview"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainExplorePreview;
