import React from "react";
import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";
import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

interface Item {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  price: number;
  stock: number;
}

function MarketEnrollPreview({ item }: { item: Item }) {
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
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>등급</th>
                <th>가격</th>
                <th>마켓 재고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item?.itemName ? item?.itemName : "-"}</td>
                <td>{item?.itemGrade ? item?.itemGrade : "-"}</td>
                <td>{item?.price ? item?.price : "-"}코인</td>
                <td>{item?.itemCnt ? item?.itemCnt : "-"}개</td>
              </tr>
            </tbody>
          </table>
          <div className={style.header_Btn}>
            <Button
              text={"판매 등록"}
              width={"6rem"}
              onClick={enrollItem}
              // className={style.header_button}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketEnrollPreview;
