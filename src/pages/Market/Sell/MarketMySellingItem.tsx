import React from "react";

import useImage from "@hooks/useImage";
import Button from "@components/Button";

import MarketSellingItemModal from "./MarketSellingItemModal";
import style from "@styles/Market/Sell/MarketMySellingItem.module.css";
import { useModalState } from "@store/store";

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
  const { modal, modalOpen } = useModalState((state) => state);

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
        <Button text={"상세"} width={"60%"} onClick={modalOpen}></Button>
      </p>
      {modal ? <MarketSellingItemModal data={data} /> : null}
    </article>
  );
}

export default MarketMySellingItem;
