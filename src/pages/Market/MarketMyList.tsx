import React from "react"
import style from "@styles/Market/MarketMyList.module.css"

function MarketMyList() {
  return (
    <div className={style.container}>
      <div className={style.coin}>
        <img src="/images/coin.svg" alt="coin" />
        <p>19,500</p>
      </div>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <aside className={style.aside}>
          <button
            onClick={() => window.history.back()}
            className={style.aside_button}
          >
            &larr; 뒤로 가기
          </button>
          <select className={style.aside_filter}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </aside>
        <main className={style.main}>
          <nav className={style.main_nav}>
            <button>All</button>
            <button>S등급</button>
            <button>A등급</button>
            <button>B등급</button>
            <button>C등급</button>
            <button>D등급</button>
          </nav>
          <section className={style.main_items}>
            <header className={style.main_items_header}>
              <div>아이템</div>
              <div>이름</div>
              <div>등급</div>
              <div>가격</div>
              <div>판매 상태</div>
              <div></div>
            </header>
            <main className={style.main_items_main}>
              <div className={style.main_items_item}>
                <div>
                  <img src="/images/Sample.svg" alt="sample" />
                </div>
                <p>chick</p>
                <p>A</p>
                <p>1000</p>
                <p>판매 완료</p>
                <div>
                  <button>Info</button>
                </div>
              </div>
            </main>
          </section>
        </main>
      </section>
    </div>
  )
}

export default MarketMyList
