import React from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Minihome/ItemBook/MinihomeItem.module.css";

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
    <article className={style[`article_item_${data?.itemGrade}`]}>
      {!data?.itemCnt ? <p className={style.article_item_disabled}></p> : null}
      <div className={style.article_item_img}>
        <img
          src={useImage(data?.imageUrl)}
          alt="sample"
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          fetchPriority="high"
        />
        {data?.itemCnt ? (
          <p className={style.article_item_count}>{data?.itemCnt}개</p>
        ) : null}
      </div>
    </article>
  );
}

export default MinihomeItems;
