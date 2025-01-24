import React from "react";
import style from "@styles/Minihome/Header/MinihomeItem.module.css";

interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number,
  itemName: string,
  userItemIds: null,
}

function MinihomeItems({data}:{data:ItemBookData}) {
  return (
    <div>
      <img src={data?.imageUrl} alt="sample" />
      <div className={style.item}>
        <p>{data?.itemGrade}</p>
        <p>{data?.itemName} / {data?.itemCnt}개</p>
      </div>
    </div>
  );
}

export default MinihomeItems;
