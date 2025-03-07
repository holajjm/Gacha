import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";
import Coin from "@components/Coin";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";

import MarketItem from "./MarketItem";
import MarketItemModal from "./MarketItemModal";
import style from "@styles/Market/MarketMain.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketMain() {
  usePageTitle("마켓");
  const SERVER_API = import.meta.env.VITE_SERVER_API;
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
      const response = await fetch(`${SERVER_API}/products${text && text}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = await response.json();
      setItemList(data?.data);
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
      <Coin />
      <section className={style.wrapper}>
        <aside className={style.aside}>
          <h1 className={style.aside_title}>마켓</h1>
          <div className={style.aside_wrapper}>
            <Button
              text={"내 판매 목록"}
              width={"10rem"}
              onClick={() => navigate("/market/mysellingitem")}
            ></Button>
            <Button
              text={"내 상품 등록"}
              width={"10rem"}
              onClick={() => navigate("/market/enroll")}
            ></Button>
          </div>
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
