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

function MarketEnrollPreview({ item }: { item: Item }) {
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
            userItemId: selectItem?.userItemIds && +selectItem?.userItemIds[0],
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
    setSelectItem(item);
  }, [item]);
  const imageTag = <img src={useImage(item?.imageUrl)} alt="previewImage" />;
  // console.log(+selectItem?.userItemIds[0]);

  return (
    <section className={style.section}>
      <span className={style.header_background}></span>
      {selectItem?.imageUrl ? (
        <>
          <header className={style.section_header}>{imageTag}</header>
          <article className={style.section_article}>
            <span className={style.section_article_wrapper}>
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
                    <td>{item?.itemName}</td>
                    <td>{item?.itemGrade}</td>
                    <td>{item?.price}코인</td>
                    <td>{item?.stock}개</td>
                  </tr>
                </tbody>
              </table>
              <span className={style.section_article_button}>
                <Button
                  text={"판매 등록"}
                  width={"6rem"}
                  onClick={enrollItem}
                ></Button>
              </span>
            </span>
          </article>
        </>
      ) : (
        <div className={style.section_header_wrapper}>
          <p className={style.section_header_text}>
            판매하실 아이템을 선택해주세요.
          </p>
        </div>
      )}
    </section>
  );
}

export default MarketEnrollPreview;
