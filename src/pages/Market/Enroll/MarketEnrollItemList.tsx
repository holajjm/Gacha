import React, { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@store/store";

import MarketEnrollPreview from "./MarketEnrollPreview";
import MarketEnrollItem from "./MarketEnrollItem";
import style from "@styles/Market/Enroll/MarketEnrollItemList.module.css";
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

function MarketSellItemList() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>({
    imageUrl: "",
    itemCnt: 0,
    itemGrade: "",
    itemId: 0,
    itemName: "",
    price: 0,
    stock: 0,
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
    setItemList(data?.data?.content);
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
      key={data.itemId}
      item={data}
      onSelect={handleItemClick}
    />
  ));
  console.log(itemList);

  return (
    <section className={style.itemList}>
      <Button
        text={"뒤로 가기"}
        width={"10rem"}
        onClick={() => window.history.back()}
        // className={style.button}
      ></Button>
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
