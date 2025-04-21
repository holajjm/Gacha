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
          src="/images/Market.svg"
          alt="MarketPreview1"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MarketItemModal.svg"
          alt="MarketPreview2"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MarketSell.svg"
          alt="MarketPreview3"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MarketSellModal.svg"
          alt="MarketPreview4"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/images/MarketEnroll.svg"
          alt="MarketPreview5"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export default MainMarketPreview;
