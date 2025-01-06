import React from "react"
import style from "@styles/Market/MarketMain.module.css"
import { useNavigate } from "react-router-dom"
import MarketItem from "./MarketItem"
// import MarketItemModal from "./MarketItemModal";

function MarketMain() {
  const navigate = useNavigate();

  function getItemList(){
    const itemList = []
    for(let i=0; i<10; i++){
      itemList.push(<MarketItem key={i}/>)
    }
    return itemList
  }
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
            onClick={() => navigate("/market/myitem")}
            className={style.aside_button}
          >
            내 판매 목록
          </button>
          <button
            onClick={() => navigate("/market/sell")}
            className={style.aside_button}
          >
            내 상품 등록
          </button>
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
            <div className={style.main_items_wrapper}>
              {getItemList()}
              {/* <MarketItem /> */}
            </div>
          </section>
        </main>
      </section>
      {/* <MarketItemModal /> */}
    </div>
  )
}

export default MarketMain
