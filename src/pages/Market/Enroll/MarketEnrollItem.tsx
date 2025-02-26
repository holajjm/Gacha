import React from "react";
import useImage from "@hooks/useImage";

import style from "@styles/Market/Enroll/MarketEnrollItem.module.css";

interface Item {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  price: number;
  stock: number;
}

function MarketEnrollItem({
  item,
  onSelect,
}: {
  item: Item;
  onSelect: (item: Item) => void;
}) {
  const handleClick = () => {
    onSelect(item);
  };
  
  return (
    <div className={style[`item_${item?.itemGrade}`]} onClick={handleClick}>
      <img className={style.item_img} src={useImage(item?.imageUrl)} alt="sample" />
      {item?.itemCnt > 0 ? <p className={style.item_cnt}>{item?.itemCnt}</p> : null}
    </div>
  );
}

export default MarketEnrollItem;
