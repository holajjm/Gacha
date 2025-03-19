import React from "react";

import Coin from "@components/Coin";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketEnrollItemList from "./MarketEnrollItemList";
import style from "@styles/Market/Enroll/MarketEnroll.module.css";

function MarketEnroll() {
  usePageTitle("Market - Enroll");
  usePageUpper();
  return (
    <div className={style.container}>
      <Coin />
      <main className={style.wrapper}>
        <MarketEnrollItemList />
      </main>
    </div>
  );
}

export default MarketEnroll;
