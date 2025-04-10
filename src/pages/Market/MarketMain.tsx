import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModalState, useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketItem from "./MarketItem";
import MarketItemModal from "./MarketItemModal";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Market/MarketMain.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketMain() {
  usePageTitle("Market");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const navigate = useNavigate();
  const { user } = useUserStore((state) => state);
  const { modal, modalOpen, modalClose } = useModalState((state) => state);
  const [itemList, setItemList] = useState<MarketItemData[]>([]);
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
    modalOpen();
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "Escape") {
      modalClose();
    }
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
      <main className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            />
            <h1 className={style.header_title}>마켓</h1>
          </aside>
          <nav className={style.header_nav}>
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
          </nav>
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
            <section className={style.article_section}>
              {renderItemList}
            </section>
          </article>
        </section>
      </main>
      {modal ? (
        <MarketItemModal
          clickItemId={clickItemId}
          onKeyPress={handleKeyPress}
        />
      ) : null}
    </div>
  );
}

export default MarketMain;
