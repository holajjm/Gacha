import React, { useEffect, useState } from "react";
import style from "@styles/Market/MarketMySellingItem.module.css";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMySellingItem({data}:{data:MySellingItemData}) {
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
    <div className={style.main_items_item}>
      <div>
        <img src={imageList} alt="sample" />
      </div>
      <p>{data?.name}</p>
      <p>{data?.grade}</p>
      <p>{data?.price}</p>
      <p>{data?.status}</p>
      <div>
        <button>Info</button>
      </div>
    </div>
  );
}

export default MarketMySellingItem;
