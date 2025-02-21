import React from "react";

import useImage from "@hooks/useImage";
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
    <div className={style.wrapper}>
      <div className={style.img}>
        <img src={useImage(data?.imageUrl)} alt="sample" />
      </div>
      <div className={style.item}>
        <p>{data?.itemGrade}</p>
        <p>{data?.itemName} / {data?.itemCnt}개</p>
      </div>
    </div>
  );
}

export default MinihomeItems;
