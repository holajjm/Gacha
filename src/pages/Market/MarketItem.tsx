import React, { useEffect, useRef } from "react";

import useImage from "@hooks/useImage";
import style from "@styles/Market/MarketItem.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketItem({
  data,
  onSelect,
  onClick,
}: {
  data: MarketItemData;
  onSelect: (itemId: number) => void;
  onClick: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const handleClick = () => {
    onSelect(data?.itemId);
    onClick();
  };
  return (
    <article onClick={handleClick} className={style.article}>
      {!data?.hasStock ? <div className={style.article_disabled}></div> : null}
      <img
        className={style.article_img}
        src={useImage(data?.imageUrl)}
        alt="item"
        ref={imgRef}
        width={96}
        height={96}
      />
    </article>
  );
}

export default MarketItem;
