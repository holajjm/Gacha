import React, { useCallback, useEffect, useState } from "react";
import MarketSellPreview from "./MarketSellPreview";
import { useUserStore } from "@store/store";

import style from "@styles/Market/MarketSellItemList.module.css";
import MarketSellItem from "./MarketSellItem";

interface Item {
  userItemId: number;
  name: string;
  grade: string;
  price: number;
  imageUrl: string;
}

function MarketSellItemList() {
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>({
    userItemId: 0,
    name: "",
    grade: "",
    price: 0,
    imageUrl: "",
  });
  const getMyItemList = async () => {
    const response = await fetch("https://222.121.46.20:80/items/me/forSale", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setItemList(data?.content);
  };
  useEffect(() => {
    getMyItemList();
  }, []);

  const handleItemClick = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const myItemList = itemList.map((data) => (
    <MarketSellItem
      key={data.userItemId}
      item={data}
      onSelect={handleItemClick}
    />
  ));

  return (
    <section className={style.itemList}>
      <button onClick={() => window.history.back()} className={style.button}>
        &larr; 뒤로 가기
      </button>
      <MarketSellPreview item={selectedItem} />
      <main className={style.main}>
        <header className={style.main_header}>내 아이템</header>
        <section className={style.main_body}>{myItemList}</section>
      </main>
    </section>
  );
}

export default MarketSellItemList;
