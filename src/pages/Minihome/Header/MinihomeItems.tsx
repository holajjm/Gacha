import React from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Minihome/Header/MinihomeItem.module.css";

interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}

function MinihomeItems({ data }: { data: ItemBookData }) {
  return (
    <div className={style[`wrapper_${data?.itemGrade}`]}>
      {!data?.itemCnt ? <div className={style.disabled}></div> : null}
      <div className={style.img}>
        <img src={useImage(data?.imageUrl)} alt="sample" />
        {data?.itemCnt ? (
          <p className={style.count}>{data?.itemCnt}개</p>
        ) : null}
      </div>
    </div>
  );
}

export default MinihomeItems;
