import React from "react";

interface Item {
  userItemId: number,
  name: string,
  grade: string,
  price: number,
  imageUrl: string
} 

function MarketSellItem({item,onSelect}:{item:Item,onSelect:(item:Item) => void}) {
  const handleClick = () => {
    onSelect(item)
  }
  return (
    <div onClick={handleClick}>
      <img src={item?.imageUrl} alt="sample" />
    </div>
  );
}

export default MarketSellItem;
