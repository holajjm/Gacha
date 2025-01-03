import React from "react"
import style from "@styles/Market/MarketSell.module.css"
import MarketSellItemList from "./MarketSellItemList"

function MarketSell() {
  return (
    <div className={style.container}>
      <div className={style.coin}>
        <img src="/images/coin.svg" alt="coin" />
        <p>19,500</p>
      </div>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <MarketSellItemList />
      </section>
    </div>
  )
}

export default MarketSell
