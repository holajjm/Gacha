import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMarketPreview({
  article5Ref,
}: {
  article5Ref: Ref<HTMLDivElement>;
}) {
  return (
    <article ref={article5Ref} className={style.article}>
      <h3>마켓</h3>
      <div className={style.img_preview}>
        <img
          src="/images/Market.webp"
          alt="MarketPreview1"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MarketItemModal.webp"
          alt="MarketPreview2"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MarketSell.webp"
          alt="MarketPreview3"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MarketSellModal.webp"
          alt="MarketPreview4"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="/images/MarketEnroll.webp"
          alt="MarketPreview5"
          width={320}
          height={160}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainMarketPreview;
