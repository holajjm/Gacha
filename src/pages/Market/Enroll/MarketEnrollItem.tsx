import useImage from "@hooks/useImage";
import React from "react";

interface Item {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  price: number;
  stock: number;
}

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
    <div onClick={handleClick}>
      <img src={useImage(item?.imageUrl)} alt="sample" />
    </div>
  );
}

export default MarketEnrollItem;
