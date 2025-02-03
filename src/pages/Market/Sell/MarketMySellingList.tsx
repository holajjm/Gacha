import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";
import MarketMySellingItem from "./MarketMySellingItem";

import style from "@styles/Market/Sell/MarketMySellingList.module.css";
import MarketSellingItemModal from "./MarketSellingItemModal";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMyList() {
  const { user } = useUserStore((state) => state);
  const [sellingItem, setSellingItem] = useState<MySellingItemData[]>([]);
  // console.log(sellingItem);

  const [selected, setSelected] = useState<string>("");
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const getMySellItems = async () => {
    const response = await fetch("https://222.121.46.20:80/products/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setSellingItem(data?.content);
  };
  useEffect(() => {
    getMySellItems();
  }, []);

  
  useEffect(() => {
    if (selected === "latest") {
      const sortByLatest = async () => {
        const response = await fetch(
          "https://222.121.46.20:80/products/me?sort=createdAt,desc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setSellingItem(data?.content);
      };
      sortByLatest();
    } else if (selected === "oldest") {
      const sortByOldest = async () => {
        const response = await fetch(
          "https://222.121.46.20:80/products/me?sort=createdAt,asc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setSellingItem(data?.content);
      };
      sortByOldest();
    }
  }, [selected]);

  const [clicked, setClicked] = useState<boolean>(false);
  const [clickedItemId, setClickedItemId] = useState<number>(0);

  const handleModalOpen = (productId:number) => {
    setClicked(true);
    setClickedItemId(productId)
  };
  const handleModalClose = () => {
    setClicked(false);
  };
  const sellingItemList = sellingItem.map((e) => (
    <MarketMySellingItem key={e.productId} data={e} modalOpen={handleModalOpen} />
  ));
  return (
    <div className={style.container}>
      <div className={style.coin}>
        <img src="/images/coin.svg" alt="coin" />
        <p>19,500</p>
      </div>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <aside className={style.aside}>
          <button
            onClick={() => window.history.back()}
            className={style.aside_button}
          >
            &larr; 뒤로 가기
          </button>
          <select onChange={handleSort} className={style.aside_filter}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </aside>
        <main className={style.main}>
          <nav className={style.main_nav}>
            <button>All</button>
            <button>S등급</button>
            <button>A등급</button>
            <button>B등급</button>
            <button>C등급</button>
            <button>D등급</button>
          </nav>
          <section className={style.main_items}>
            <header className={style.main_items_header}>
              <div>아이템</div>
              <div>이름</div>
              <div>등급</div>
              <div>가격</div>
              <div>판매 상태</div>
              <div></div>
            </header>
            <main className={style.main_items_main}>{sellingItemList}</main>
          </section>
        </main>
      </section>
      {clicked ? <MarketSellingItemModal clickedItemId={clickedItemId} onClick={handleModalClose} /> : null}
    </div>
  );
}

export default MarketMyList;
