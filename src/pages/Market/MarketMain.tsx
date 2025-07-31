import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button";
import MarketItemModal from "@components/modals/MarketItemModal";
import ItemListSkeleton from "@components/skeleton/ItemListSkeleton";
import { useDataQuery } from "@features/market/useDataQuery";
import { ModalPortal } from "@hooks/ModalPortal";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { useModalState } from "@store/store.ts";
import style from "@styles/Market/MarketMain.module.css";

import MarketItem from "./MarketItem";
import { SlArrowLeft } from "react-icons/sl";
import type { MarketItemData } from "types/market";
import ItemListNavbar from "@components/ItemListNavbar";

function MarketMain() {
  usePageTitle("마켓");
  usePageUpper();
  const navigate = useNavigate();
  const modal = useModalState((state) => state.modal);
  const modalOpen = useModalState((state) => state.modalOpen);
  const modalClose = useModalState((state) => state.modalClose);
  const [clickItemId, setClickItemId] = useState<number>(0);
  const [navClick, setNavClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = navClick ? `?grade=${navClick}` : navClick;

  const { data: marketData, isLoading } = useDataQuery({ text });
  // console.log(marketData);

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
  const renderItemList = marketData?.map((e: MarketItemData) => (
    <MarketItem
      key={e.itemId}
      data={e}
      onSelect={handleClickItemId}
      onClick={handleClicked}
    />
  ));

  return (
    <>
      <div className={style.container}>
        {modal && (
          <ModalPortal>
            <MarketItemModal
              clickItemId={clickItemId}
              onKeyPress={handleKeyPress}
            />
          </ModalPortal>
        )}
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
            <ItemListNavbar
              handleClick={handleClick}
              click={navClick}
              type={"market"}
            />
            <article className={style.article}>
              {isLoading ? <ItemListSkeleton /> : <>{renderItemList}</>}
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default MarketMain;
