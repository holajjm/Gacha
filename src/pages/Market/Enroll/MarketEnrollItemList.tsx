import React, { useCallback, useEffect, useState } from "react";

import { useUserStore } from "@store/store";
import Button from "@components/Button";

import MarketEnrollPreview from "./MarketEnrollPreview";
import MarketEnrollItem from "./MarketEnrollItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Market/Enroll/MarketEnrollItemList.module.css";

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

function MarketEnrollItemList() {
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
    userItemIds: [],
  });
  const [pageNum, setPageNum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getMyItemList = async () => {
    const response = await fetch(
      `${SERVER_API}/items/me?sort=createdAt,desc&page=${currentPage}&size=7`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    // console.log(data?.data);
    // console.log(data?.data?.content);
    setItemList(data?.data?.content);
    setPageNum(data?.data?.totalPages);
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
  // console.log(pageNumList());

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
  // console.log(itemList);

  return (
    <main className={style.main}>
      <header className={style.main_header}>
        <Button
          text={<SlArrowLeft />}
          width={"2.5rem"}
          onClick={() => window.history.back()}
        ></Button>
        <h1 className={style.main_header_title}>내 상품 등록</h1>
      </header>
      <section className={style.section}>
        <MarketEnrollPreview item={selectedItem} />
        <span className={style.section_wrapper}>
          <h1 className={style.section_title}>내 아이템</h1>
          {itemList.length === 0 ? (
            <p className={style.section_message}>보유중인 아이템이 없습니다.</p>
          ) : (
            <article className={style.section_article}>{myItemList}</article>
          )}
          <ul className={style.numberList}>{pageNumList()}</ul>
        </span>
      </section>
    </main>
  );
}

export default MarketEnrollItemList;
