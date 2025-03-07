import React from "react"
import style from "@styles/Market/Enroll/MarketEnroll.module.css"
import MarketEnrollItemList from "./MarketEnrollItemList"
import Coin from "@components/Coin"
import usePageTitle from "@hooks/usePageTitle"

function MarketEnroll() {
  usePageTitle("마켓 - 내 상품 등록");
  return (
    <div className={style.container}>
      <Coin />
      <section className={style.wrapper}>
        <MarketEnrollItemList />
      </section>
    </div>
  )
}

export default MarketEnroll
