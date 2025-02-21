import React, { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@store/store";

import MarketEnrollPreview from "./MarketEnrollPreview";
import MarketEnrollItem from "./MarketEnrollItem";
import style from "@styles/Market/Enroll/MarketEnrollItemList.module.css";

interface Item {
  userItemId: number;
  name: string;
  grade: string;
  price: number;
  imageUrl: string;
}

function MarketSellItemList() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>({
    userItemId: 0,
    name: "",
    grade: "",
    price: 0,
    imageUrl: "",
  });
  const [pageNum, setPageNum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getMyItemList = async () => {
    const response = await fetch(
      `${SERVER_API}/items/me/forSale?sort=createdAt,desc&page=${currentPage}&size=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setItemList(data?.content);
    setPageNum(Math.floor(data?.totalElements / 10) + 1);
  };
  useEffect(() => {
    getMyItemList();
  }, [currentPage]);

  const pageNumList = () => {
    const numList = [];
    for (let i = 0; i < pageNum; i++) {
      numList.push(
        <li
          className={currentPage == i ? style.active_pageNum : style.pageNum}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </li>,
      );
    }
    return numList;
  };

  const handleItemClick = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const myItemList = itemList.map((data) => (
    <MarketEnrollItem
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
      <MarketEnrollPreview item={selectedItem} />
      <main className={style.main}>
        <header className={style.main_header}>내 아이템</header>
        <section className={style.main_body}>{myItemList}</section>
      </main>
      <ul className={style.pageList}>{pageNumList()}</ul>
    </section>
  );
}

export default MarketSellItemList;
