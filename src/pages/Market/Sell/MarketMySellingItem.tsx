import React from "react";

import { useModalState } from "@store/store.ts";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

import style from "@styles/Market/Sell/MarketMySellingItem.module.css";
import { MySellingItemData } from "types/market";

function MarketMySellingItem({
  data,
  handleClickItemId,
}: {
  data: MySellingItemData;
  handleClickItemId: (itemId: number) => void;
}) {
  const { modalOpen } = useModalState((state) => state);
  const handleClick = () => {
    handleClickItemId(data?.productId);
    modalOpen();
  };
  return (
    <article onClick={handleClick} className={style.article}>
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
    </article>
  );
}

export default MarketMySellingItem;
