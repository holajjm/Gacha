import React from "react";
import style from "@styles/Market/MarketSellPreview.module.css"

interface Item {
  image: string,
  name: string,
  level: number,
  avPrice: number,
  price: number
}

function MarketSellPreview({item}:{item:Item}) {
  console.log(item);
  
  return (
    <div className={style.header}>
      <div className={style.header_background}></div>
      <div className={style.header_image}>
        <img src={`/images/${item?.image}`} alt={""} />
      </div>
      <div className={style.header_item}>
        <p>Name: {item?.name}</p>
        <p>Level: {item?.level}</p>
        <p>Average Price: {item?.avPrice}</p>
        <p>Price: {item?.price}</p>
        <button className={style.header_button}>Sell</button>
      </div>
    </div>
  )
}

export default MarketSellPreview
