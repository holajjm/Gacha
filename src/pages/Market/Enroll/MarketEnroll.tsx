import React from "react"
import style from "@styles/Market/Enroll/MarketEnroll.module.css"
import MarketEnrollItemList from "./MarketEnrollItemList"

function MarketEnroll() {
  return (
    <div className={style.container}>
      <div className={style.coin}>
        <img src="/images/coin.svg" alt="coin" />
        <p>19,500</p>
      </div>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <MarketEnrollItemList />
      </section>
    </div>
  )
}

export default MarketEnroll
