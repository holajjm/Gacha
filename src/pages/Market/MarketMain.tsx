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
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<MarketItemData[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [clickItemId, setClickItemId] = useState<number>(0);

  const navigate = useNavigate();
  useEffect(() => {
    const getMarketItem = async () => {
      const response = await fetch("https://222.121.46.20:80/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = await response.json();
      setItemList(data);
    };
    getMarketItem();
  }, []);

  const handleClicked = () => {
    setClicked(true)
  }
  const handleModalClicked = () => {
    setClicked(false)
  }
  const handleClickItemId = useCallback((itemId: number) => {
    setClickItemId(itemId);
  }, []);
  const renderItemList = itemList.map((e) => (
    <MarketItem key={e.itemId} data={e} onSelect={handleClickItemId} onClick={handleClicked}/>
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
          <nav className={style.main_nav}>
            <button>All</button>
            <button>S등급</button>
            <button>A등급</button>
            <button>B등급</button>
            <button>C등급</button>
            <button>D등급</button>
          </nav>
          <section className={style.main_items}>
            <div className={style.main_items_wrapper}>{renderItemList}</div>
          </section>
        </main>
      </section>
      {clicked ? <MarketItemModal clickItemId={clickItemId} onClick={handleModalClicked}/> : null}
    </div>
  );
}

export default MarketMain;
