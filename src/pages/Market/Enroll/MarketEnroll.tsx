import React from "react";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketEnrollItemList from "./MarketEnrollItemList";
import style from "@styles/Market/Enroll/MarketEnroll.module.css";

function MarketEnroll() {
  usePageTitle("마켓 - 판매 등록");
  usePageUpper();
  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <MarketEnrollItemList />
      </main>
    </div>
  );
}

export default MarketEnroll;
