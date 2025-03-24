import React from "react";

import style from "@styles/Main/MainPage.module.css";

function MainMarketPreview() {
  return (
    <article className={style.article}>
      <h1>Market</h1>
      <div className={style.img_preview}>
        <img src="src/assets/images/Market.svg" alt="" />
        <img src="src/assets/images/MarketItemModal.svg" alt="" />
        <img src="src/assets/images/MarketSell.svg" alt="" />
        <img src="src/assets/images/MarketSellModal.svg" alt="" />
        <img src="src/assets/images/MarketEnroll.svg" alt="" />
      </div>
    </article>
  );
}

export default MainMarketPreview;
