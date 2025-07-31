import React from "react";

import Button from "@components/Button";
import { useEnrollQuery } from "@features/market/useEnrollQuery";
import useImage from "@hooks/useImage";
import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";

import type { Item } from "types/market";

function MarketEnrollPreview({ item }: { item: Item }) {
  const { mutate: enrollItem } = useEnrollQuery({ item });

  const imageTag = (
    <img
      src={useImage(item?.imageUrl)}
      alt={item?.itemName || "previewImage"}
    />
  );
  // console.log(item);

  return (
    <section className={style.section}>
      <span className={style.background}></span>
      {item?.imageUrl ? (
        <>
          <header className={style.section_header}>{imageTag}</header>
          <article className={style.section_article}>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>등급</th>
                  <th>가격</th>
                  <th>재고</th>
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
          </article>
        </>
      ) : (
        <div className={style.section_no_contents}>
          <p className={style.section_no_text}>
            판매하실 아이템을 선택해주세요.
          </p>
        </div>
      )}
    </section>
  );
}

export default MarketEnrollPreview;
