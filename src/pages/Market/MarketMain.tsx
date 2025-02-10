import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/store";

import MarketItem from "./MarketItem";
import MarketItemModal from "./MarketItemModal";
import style from "@styles/Market/MarketMain.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketMain() {
  const navigate = useNavigate();
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<MarketItemData[]>([]);
  const [itemClicked, setItemClicked] = useState<boolean>(false);
  const [clickItemId, setClickItemId] = useState<number>(0);
  const [navClick, setNavClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = navClick ? `?grade=${navClick}` : navClick;

  useEffect(() => {
    const getMarketItem = async () => {
      const response = await fetch(
        `https://222.121.46.20:80/products${text && text}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      setItemList(data);
    };
    getMarketItem();
  }, [navClick]);

  const handleClicked = () => {
    setItemClicked(true);
  };
  const handleModalClicked = () => {
    setItemClicked(false);
  };
  const handleClickItemId = useCallback((itemId: number) => {
    setClickItemId(itemId);
  }, []);
  const renderItemList = itemList.map((e) => (
    <MarketItem
      key={e.itemId}
      data={e}
      onSelect={handleClickItemId}
      onClick={handleClicked}
    />
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
            onClick={() => navigate("/market/mysellingitem")}
            className={style.aside_button}
          >
            내 판매 목록
          </button>
          <button
            onClick={() => navigate("/market/enroll")}
            className={style.aside_button}
          >
            내 상품 등록
          </button>
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
            <div className={style.main_items_wrapper}>{renderItemList}</div>
          </section>
        </main>
      </section>
      {itemClicked ? (
        <MarketItemModal
          clickItemId={clickItemId}
          onClick={handleModalClicked}
        />
      ) : null}
    </div>
  );
}

export default MarketMain;
