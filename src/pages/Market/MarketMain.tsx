import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { useModalState, useUserStore } from "@store/store.ts";
import Button from "@components/Button";
import { ModalPortal } from "@hooks/ModalPortal";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketItem from "./MarketItem";
import MarketItemModal from "./MarketItemModal";
import MinihomeItemSkeleton from "@components/skeleton/MinihomeItemSkeleton";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Market/MarketMain.module.css";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketMain() {
  usePageTitle("마켓");
  usePageUpper();
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const { user } = useUserStore((state) => state);
  const { modal, modalOpen, modalClose } = useModalState((state) => state);

  const [clickItemId, setClickItemId] = useState<number>(0);
  const [navClick, setNavClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = navClick ? `?grade=${navClick}` : navClick;

  const getMarketItem = async () => {
    const response = await axios.get(`/products${text && text}`);
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["MarketItem", user, text],
    queryFn: getMarketItem,
    select: (data) => data?.data,
    throwOnError: true,
  });
  // console.log(data);

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
  const renderItemList = data?.map((e: MarketItemData) => (
    <MarketItem
      key={e.itemId}
      data={e}
      onSelect={handleClickItemId}
      onClick={handleClicked}
    />
  ));

  return (
    <>
      {modal && (
        <ModalPortal>
          <MarketItemModal
            clickItemId={clickItemId}
            onKeyPress={handleKeyPress}
          />
        </ModalPortal>
      )}
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
                className={
                  navClick === "S" ? style.active_button : style.button
                }
              >
                S등급
              </button>
              <button
                datatype="A"
                className={
                  navClick === "A" ? style.active_button : style.button
                }
              >
                A등급
              </button>
              <button
                datatype="B"
                className={
                  navClick === "B" ? style.active_button : style.button
                }
              >
                B등급
              </button>
              <button
                datatype="C"
                className={
                  navClick === "C" ? style.active_button : style.button
                }
              >
                C등급
              </button>
              <button
                datatype="D"
                className={
                  navClick === "D" ? style.active_button : style.button
                }
              >
                D등급
              </button>
            </nav>
            <article className={style.article}>
              {isLoading ? (
                <div className={style.article_loading}>
                  {/* <img
                  src="/images/Loading.webp"
                  alt="Loading"
                  width={256}
                  height={256}
                /> */}
                  <MinihomeItemSkeleton />
                </div>
              ) : (
                <section className={style.article_section}>
                  {renderItemList}
                </section>
              )}
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

export default MarketMain;
