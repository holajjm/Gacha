import React, { useEffect, useState } from "react";

interface Item {
  userItemId: number,
  name: string,
  grade: string,
  price: number,
  imageUrl: string
} 

function MarketEnrollItem({item,onSelect}:{item:Item,onSelect:(item:Item) => void}) {
  const handleClick = () => {
    onSelect(item)
  }
  const [imageList, setImageList] = useState<string>();
    const image = async () => {
      const response = await fetch(`https://222.121.46.20:80${item?.imageUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "image/png, image/jif"
        },
      });
      const blob = await response.blob();
      const imageObjUrl = URL.createObjectURL(blob);
      setImageList(imageObjUrl);
    };
    useEffect(() => {
      image();
    }, []);
  return (
    <div onClick={handleClick}>
      <img src={imageList} alt="sample" />
    </div>
  );
}

export default MarketEnrollItem;
