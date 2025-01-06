import React from "react"
import style from "@styles/Gacha/GachaMain.module.css"

function GachaMain() {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.coin}>
          <img src="/images/coin.svg" alt="coin" />
          <p>19,500</p>
        </div>
        <header className={style.header}>
          <h1>GACHA SHOP</h1>
          <p>랜덤 아이템을 뽑아봐요!</p>
        </header>
        <main className={style.main}>
          <div>
            <img src="/images/GachaSample.svg" alt="Gacha" />
          </div>
          <button>아이템 뽑기</button>
        </main>
      </section>
    </div>
  )
}

export default GachaMain