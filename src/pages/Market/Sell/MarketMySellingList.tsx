import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";
import MarketMySellingItem from "./MarketMySellingItem";

import MarketSellingItemModal from "./MarketSellingItemModal";
import Coin from "@components/Coin";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
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
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [sellingItem, setSellingItem] = useState<MySellingItemData[]>([]);
  console.log(sellingItem);
  const [selected, setSelected] = useState<string>("");
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const [navClick, setNavClick] = useState<string>("");
  console.log(navClick);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = navClick ? `&grade=${navClick}` : navClick;
  console.log(text);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getMySellItems = async () => {
    const response = await fetch(
      `${SERVER_API}/products/me?sort=createdAt,desc&page=${currentPage}&size=5${text && text}`,
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
  }, [navClick]);

  const [currentPage, setCurrentPage] = useState<number>(0);
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
        setSellingItem(data?.content);
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
        setSellingItem(data?.content);
      };
      sortByOldest();
    }
  }, [selected]);

  const [clicked, setClicked] = useState<boolean>(false);
  const [clickedItemId, setClickedItemId] = useState<number>(0);

  const handleModalOpen = (productId: number) => {
    setClicked(true);
    setClickedItemId(productId);
  };
  const handleModalClose = () => {
    setClicked(false);
  };

  const sellingItemList = sellingItem.map((e) => (
    <MarketMySellingItem
      key={e.productId}
      data={e}
      modalOpen={handleModalOpen}
    />
  ));
  return (
    <div className={style.container}>
      <Coin />
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <aside className={style.aside}>
          <div className={style.aside_wrapper}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
              // className={style.aside_button}
            ></Button>
            <h1 className={style.aside_title}>내 판매 목록</h1>
          </div>
          <select onChange={handleSort} className={style.aside_filter}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </aside>
        <main className={style.main}>
          <nav onClick={handleClick} className={style.main_nav}>
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
      {clicked ? (
        <MarketSellingItemModal
          clickedItemId={clickedItemId}
          onClick={handleModalClose}
        />
      ) : null}
    </div>
  );
}

export default MarketMyList;
