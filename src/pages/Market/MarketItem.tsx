import React, { useEffect, useState } from "react";

import style from "@styles/Market/MarketItem.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketItem({ data }: { data: MarketItemData }) {
  const [imageList, setImageList] = useState<string>();
  const image = async () => {
    const response = await fetch(`https://222.121.46.20:80${data?.imageUrl}`, {
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
    <div className={style.item}>
      <img src={imageList} alt="cat" />
    </div>
  );
}

export default MarketItem;
