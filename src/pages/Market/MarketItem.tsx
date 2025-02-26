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
    <div onClick={handleClick} className={style.item}>
      <img src={useImage(data?.imageUrl)} alt="item" />
    </div>
  );
}

export default MarketItem;
