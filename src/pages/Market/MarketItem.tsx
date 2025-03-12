import React from "react";

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
  const handleClick = () => {
    onSelect(data?.itemId);
    onClick();
  };
  return (
    <article onClick={handleClick} className={style.article}>
      {!data?.hasStock ? <div className={style.article_disabled}></div> : null}
      <img className={style.article_img} src={useImage(data?.imageUrl)} alt="item" />
    </article>
  );
}

export default MarketItem;
