import React, { useEffect, useState } from "react";
import style from "@styles/Market/MarketSellPreview.module.css"
import { useUserStore } from "@store/store";

interface Item {
  userItemId: number,
  name: string,
  grade: string,
  price: number,
  imageUrl: string
}

function MarketSellPreview({item}:{item:Item}) {
  const {user} = useUserStore((state => state))  ;
  const enrollItem = async () => {
    try {
      await fetch("https://222.121.46.20:80/products",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify({
          userItemId: item?.userItemId
        })
      });
      alert("상품이 등록되었습니다.")
    } catch (error) {
      console.error(error);
    }
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
      }, [item]);
  return (
    <div className={style.header}>
      <div className={style.header_background}></div>
      <div className={style.header_image}>
        <img src={imageList} alt="image" />
      </div>
      <div className={style.header_item}>
        <p>Name: {item?.name}</p>
        <p>Grade: {item?.grade}</p>
        <p>Price: {item?.price}</p>
        <button onClick={enrollItem} className={style.header_button}>판매 등록</button>
      </div>
    </div>
  )
}

export default MarketSellPreview
