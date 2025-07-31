import React from "react";

import useImage from "@hooks/useImage";
import style from "@styles/Minihome/ItemBook/MinihomeItem.module.css";

import type { ItemBookData } from "types/minihome";

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
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
        {data?.itemCnt ? (
          <p className={style.article_item_count}>{data?.itemCnt}개</p>
        ) : null}
      </div>
    </article>
  );
}

export default MinihomeItems;
