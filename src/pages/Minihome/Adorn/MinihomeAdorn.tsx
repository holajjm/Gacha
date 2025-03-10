import React, { useEffect, useState } from "react";

import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import useImage from "@hooks/useImage";

import MinihomeAdornBackground from "./MinihomeAdornBackground";
import MinihomeAdornItemList from "./MinihomeAdornItemList";
import MinihomeAdornDraggableItem from "./MinihomeAdornDraggableItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css";

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}
interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}

function MinihomeAdorn() {
  usePageTitle("미니홈 꾸미기");
  const [active, setActive] = useState<string | null>("BACKGROUND");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive((e.target as HTMLElement).getAttribute("datatype"));
  };
  const [items, setItems] = useState<ItemData[]>([]);
  const [item, setItem] = useState<ItemData>({
    imageUrl: "",
    itemCnt: 0,
    itemGrade: "",
    itemId: 0,
    itemName: "",
    userItemIds: null,
  });

  const handleItem = (data: ItemData) => {
    setItem(data);
  };
  useEffect(() => {
    setItems((items) => [...items, item]);
  }, [item]);
  const [background, setBackground] = useState<BackgroundItemData>();
  const handleBackground = (data: BackgroundItemData) => {
    setBackground(data);
  };
  const draggableItems = items.map((e) => (
    <MinihomeAdornDraggableItem key={e.itemId} data={e} />
  ));

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <aside className={style.aside}>
          <div className={style.aside_wrapper}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            ></Button>
            <h1 className={style.aside_title}>미니홈 꾸미기</h1>
          </div>
          <Button text={"저장하기"} width={"20%"} onClick={() => {}}></Button>
        </aside>
        <section className={style.section}>
          <header className={style.header}>
            <img
              className={style.header_background}
              src={useImage(background?.imageUrl as string)}
              alt=""
            />
            {draggableItems}
          </header>
          <main className={style.main}>
            <nav onClick={handleClick} className={style.main_nav}>
              <button
                datatype="BACKGROUND"
                className={
                  active === "BACKGROUND" || !active
                    ? style.active
                    : style.button
                }
              >
                배경
              </button>
              <button
                datatype="ITEM"
                className={active === "ITEM" ? style.active : style.button}
              >
                아이템
              </button>
            </nav>
            {active === "BACKGROUND" || !active ? (
              <MinihomeAdornBackground getBack={handleBackground} />
            ) : (
              <MinihomeAdornItemList getItem={handleItem} />
            )}
          </main>
        </section>
      </div>
    </div>
  );
}

export default MinihomeAdorn;
