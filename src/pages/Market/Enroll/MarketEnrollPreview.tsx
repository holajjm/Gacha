import React from "react";
import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";
import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

interface Item {
  imageUrl: string;
  itemCnt: number
  itemGrade: string;
  itemId: number;
  itemName: string;
  price: number;
  stock: number
}

function MarketSellPreview({ item }: { item: Item }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const enrollItem = async () => {
    try {
      await fetch(`${SERVER_API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          userItemId: item?.itemId,
        }),
      });
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={style.header}>
      <div className={style.header_background}></div>
      <div className={style.header_image}>
        <img src={useImage(item?.imageUrl)} alt="image" />
      </div>
      <div className={style.header_item}>
        <div className={style.header_wrapper}>
          <p>
            <span>Name:</span> <strong>{item?.itemName ? item?.itemName : "-"}</strong>
          </p>
          <p>
            <span>Grade:</span>{" "}
            <strong>{item?.itemGrade ? item?.itemGrade : "-"}</strong>
          </p>
          <p>
            <span>Price:</span> <strong>{item?.price ? item?.price : 0}</strong>
          </p>
          <Button
            text={"판매 등록"}
            width={"6rem"}
            onClick={enrollItem}
            // className={style.header_button}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default MarketSellPreview;
