import React, { useState } from "react"
import style from "@styles/Market/MarketSellItemList.module.css"
import MarketSellPreview from "./MarketSellPreview"

interface Item {
  image: string
  name: string
  level: number
  avPrice: number
  price: number
}

const dummyItem: Item[] = [
  {
    image: "Sample.svg",
    name: "chicken",
    level: 1,
    avPrice: 1000,
    price: 1000,
  },
  {
    image: "Sample.svg",
    name: "dog",
    level: 2,
    avPrice: 2000,
    price: 2000,
  },
  {
    image: "Sample.svg",
    name: "frog",
    level: 3,
    avPrice: 3000,
    price: 3000,
  },
]

function MarketSellItemList() {
  const [item, setItem] = useState<Item>()
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const num = parseInt(
      (e.target as HTMLElement).getAttribute("data-text") || "0",
      10,
    )
    setItem(dummyItem[num - 1])
  }

  return (
    <section className={style.itemList}>
      <button onClick={() => window.history.back()} className={style.button}>
        &larr; 뒤로 가기
      </button>
      <MarketSellPreview item={item as Item} />
      <main className={style.main}>
        <header className={style.main_header}>내 아이템</header>
        <section onClick={handleClick} className={style.main_body}>
          <div>
            <img data-text={1} src="/images/Sample.svg" alt="sample" />
          </div>
          <div>
            <img data-text={2} src="/images/Sample.svg" alt="sample" />
          </div>
          <div>
            <img data-text={3} src="/images/Sample.svg" alt="sample" />
          </div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
          <div data-text={3}>3</div>
        </section>
      </main>
    </section>
  )
}

export default MarketSellItemList
