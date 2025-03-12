import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";

import Coin from "@components/Coin";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketMySellingItem from "./MarketMySellingItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Market/Sell/MarketMySellingList.module.css";

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
  usePageTitle("마켓 - 내 판매 목록");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [sellingItem, setSellingItem] = useState<MySellingItemData[]>([]);
  const [selected, setSelected] = useState<string>("");
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const [navClick, setNavClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = navClick ? `&grade=${navClick}` : navClick;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getMySellItems = async () => {
    const response = await fetch(
      `${SERVER_API}/products/me?sort=createdAt,desc&page=${currentPage}&size=5${String(text)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setSellingItem((prevList) => [...prevList, ...(data?.data?.content || [])]);
    setCurrentPage((prev) => prev + 1);
  };
  useEffect(() => {
    getMySellItems();
  }, [text]);

  const handleScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    if (sellingItem.length > 0 && scrollTop + clientHeight >= scrollHeight)
      getMySellItems();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sellingItem]);

  useEffect(() => {
    if (selected === "latest") {
      const sortByLatest = async () => {
        const response = await fetch(
          `${SERVER_API}/products/me?sort=createdAt,desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setSellingItem(data?.data?.content);
      };
      sortByLatest();
    } else if (selected === "oldest") {
      const sortByOldest = async () => {
        const response = await fetch(
          `${SERVER_API}/products/me?sort=createdAt,asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setSellingItem(data?.data?.content);
      };
      sortByOldest();
    }
  }, [selected]);

  const sellingItemList = sellingItem.map((e) => (
    <MarketMySellingItem key={e.productId} data={e} />
  ));
  return (
    <div className={style.container}>
      <Coin />
      <main className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_wrapper}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            ></Button>
            <h1 className={style.header_title}>내 판매 목록</h1>
          </aside>
          <select onChange={handleSort} className={style.header_filter}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </header>
        <section className={style.section}>
          <nav onClick={handleClick} className={style.section_nav}>
            <button
              datatype=""
              className={navClick === "" ? style.active_button : style.button}
            >
              All
            </button>
            <button
              datatype="S"
              className={navClick === "S" ? style.active_button : style.button}
            >
              S등급
            </button>
            <button
              datatype="A"
              className={navClick === "A" ? style.active_button : style.button}
            >
              A등급
            </button>
            <button
              datatype="B"
              className={navClick === "B" ? style.active_button : style.button}
            >
              B등급
            </button>
            <button
              datatype="C"
              className={navClick === "C" ? style.active_button : style.button}
            >
              C등급
            </button>
            <button
              datatype="D"
              className={navClick === "D" ? style.active_button : style.button}
            >
              D등급
            </button>
          </nav>
          <article className={style.article}>
            <aside className={style.article_aside}>
              <p className={style.article_aside_background}></p>
              <p>아이템</p>
              <p>이름</p>
              <p>등급</p>
              <p>가격</p>
              <p>판매 상태</p>
              <p></p>
            </aside>
            <section className={style.article_section}>{sellingItemList}</section>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketMyList;
