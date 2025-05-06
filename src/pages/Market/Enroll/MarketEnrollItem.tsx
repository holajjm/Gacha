import React, { useEffect, useRef } from "react";

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
  userItemIds: number[];
}

function MarketEnrollItem({
  item,
  onSelect,
}: {
  item: Item;
  onSelect: (item: Item) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
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
        ref={imgRef}
        width={96}
        height={96}
      />
      {item?.itemCnt > 0 ? (
        <p className={style.article_cnt}>{item?.itemCnt}</p>
      ) : null}
    </article>
  );
}

export default MarketEnrollItem;
