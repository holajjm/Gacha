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
    <div className={style.main_items_item}>
      <div className={style.main_items_background}></div>
      <div className={style.main_items_img}>
        <img src={useImage(data?.imageUrl)} alt="sample" />
      </div>
      <p>{data?.name}</p>
      <p>{data?.grade}</p>
      <p>{data?.price}</p>
      <p>{data?.status}</p>
      <div>
        <Button text={"Info"} width={"60%"} onClick={handleModalOpen}></Button>
      </div>
      {clicked ? (
        <MarketSellingItemModal data={data} onClick={handleModalClose} />
      ) : null}
    </div>
  );
}

export default MarketMySellingItem;
