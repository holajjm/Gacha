import React from "react"
import style from "@styles/Market/Enroll/MarketEnroll.module.css"
import MarketEnrollItemList from "./MarketEnrollItemList"
import Coin from "@components/Coin"

function MarketEnroll() {
  return (
    <div className={style.container}>
      <Coin />
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <MarketEnrollItemList />
      </section>
    </div>
  )
}

export default MarketEnroll
