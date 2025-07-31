import React from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Market/Enroll/MarketEnrollItem.module.css";
import { Item } from "types/market";

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
    <article
      className={style[`article_${item?.itemGrade}`]}
      onClick={handleClick}
    >
      <img
        className={style.article_img}
        src={useImage(item?.imageUrl)}
        alt="sample"
        width={96}
        height={96}
        {...{ fetchpriority: "high" }}
        decoding="async"
      />
      {item?.itemCnt > 0 ? (
        <p className={style.article_cnt}>{item?.itemCnt}</p>
      ) : null}
    </article>
  );
}

export default MarketEnrollItem;
