import React, { useEffect, useState } from "react";

import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";
import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";

interface Item {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  price: number;
  stock: number;
  userItemIds: number[];
}

function MarketEnrollPreview({
  item,
  defaultItem,
}: {
  item: Item;
  defaultItem: Item;
}) {
  const [selectItem, setSelectItem] = useState<Item>({
    imageUrl: "",
    itemCnt: 0,
    itemGrade: "",
    itemId: 0,
    itemName: "",
    price: 0,
    stock: 0,
    userItemIds: [],
  });
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const enrollItem = async () => {
    if (confirm("상품을 판매하시겠습니까?")) {
      try {
        await fetch(`${SERVER_API}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            userItemId: selectItem?.userItemIds[0],
          }),
        });
        alert("상품이 등록되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    setSelectItem(defaultItem);
  }, [defaultItem]);
  useEffect(() => {
    setSelectItem(item);
  }, [item]);
  const previewImage = item?.imageUrl ? item?.imageUrl : defaultItem?.imageUrl;
  return (
    <div className={style.header}>
      <div className={style.header_background}></div>
      <div className={style.header_image}>
        <img src={useImage(previewImage)} alt="image" />
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
                <td>
                  {item?.itemName ? item?.itemName : defaultItem?.itemName}
                </td>
                <td>
                  {item?.itemGrade ? item?.itemGrade : defaultItem?.itemGrade}
                </td>
                <td>{item?.price ? item?.price : defaultItem?.price}코인</td>
                <td>
                  {item?.itemCnt ? item?.itemCnt : defaultItem?.itemCnt}개
                </td>
              </tr>
            </tbody>
          </table>
          <div className={style.header_Btn}>
            <Button
              text={"판매 등록"}
              width={"6rem"}
              onClick={enrollItem}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketEnrollPreview;
