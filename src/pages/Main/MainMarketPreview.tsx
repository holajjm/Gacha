import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMarketPreview() {
  return (
    <article className={style.article}>
      <h1>Market</h1>
      <div className={style.img_preview}>
        <img src="/images/Market.svg" alt="" />
        <img src="/images/MarketItemModal.svg" alt="" />
        <img src="/images/MarketSell.svg" alt="" />
        <img src="/images/MarketSellModal.svg" alt="" />
        <img src="/images/MarketEnroll.svg" alt="" />
      </div>
    </article>
  );
}

export default MainMarketPreview;
