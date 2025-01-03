import React from "react";
import style from "@styles/Market/MarketItemModal.module.css";

function MarketItemModal() {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <button className={style.button}>X</button>
        <section className={style.contents}>
          <aside className={style.aside}>
            <img src="/images/Sample.svg" alt="sample" />
          </aside>
          <main className={style.main}>
            <p>이름 | Name</p>
            <p>등급 | A</p>
            <p>수량 | 3개</p>
            <button>구매</button>
          </main>
        </section>
      </section>
    </div>
  )
}

export default MarketItemModal