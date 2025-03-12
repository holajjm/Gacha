import React, { useState } from "react";

import useImage from "@hooks/useImage";
import Button from "@components/Button";

import MarketSellingItemModal from "./MarketSellingItemModal";
import style from "@styles/Market/Sell/MarketMySellingItem.module.css";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMySellingItem({ data }: { data: MySellingItemData }) {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleModalOpen = () => {
    setClicked(true);
  };
  const handleModalClose = () => {
    setClicked(false);
  };
  return (
    <article className={style.article}>
      <p className={style.article_background}></p>
      <div className={style.article_img}>
        <img src={useImage(data?.imageUrl)} alt="sample" />
      </div>
      <p className={style.article_item}>{data?.name}</p>
      <p className={style.article_item}>{data?.grade}</p>
      <p className={style.article_item}>{data?.price}</p>
      <p className={style.article_item}>{data?.status}</p>
      <p className={style.article_item}>
        <Button text={"상세"} width={"60%"} onClick={handleModalOpen}></Button>
      </p>
      {clicked ? (
        <MarketSellingItemModal data={data} onClick={handleModalClose} />
      ) : null}
    </article>
  );
}

export default MarketMySellingItem;
