import React from "react";

import Coin from "@components/Coin";
import usePageTitle from "@hooks/usePageTitle";

import MarketEnrollItemList from "./MarketEnrollItemList";
import style from "@styles/Market/Enroll/MarketEnroll.module.css";

function MarketEnroll() {
  usePageTitle("마켓 - 내 상품 등록");
  return (
    <div className={style.container}>
      <Coin />
      <section className={style.wrapper}>
        <MarketEnrollItemList />
      </section>
    </div>
  );
}

export default MarketEnroll;
