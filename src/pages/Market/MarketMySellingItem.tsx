import React from "react";
import style from "@styles/Market/MarketMySellingItem.module.css";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMySellingItem({data}:{data:MySellingItemData}) {
  return (
    <div className={style.main_items_item}>
      <div>
        <img src={data?.imageUrl} alt="sample" />
      </div>
      <p>{data?.name}</p>
      <p>{data?.grade}</p>
      <p>{data?.price}</p>
      <p>{data?.status}</p>
      <div>
        <button>Info</button>
      </div>
    </div>
  );
}

export default MarketMySellingItem;
