import React, { useRef, useState } from "react";
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css";
import MinihomeAdornBackground from "./MinihomeAdornBackground";
import MinihomeAdornItemList from "./MinihomeAdornItemList";
import Button from "@components/Button";
import { SlArrowLeft } from "react-icons/sl";
import usePageTitle from "@hooks/usePageTitle";
import useImage from "@hooks/useImage";

import Draggable from "react-draggable";
// import MinihomeAdornDraggableItem from "./MinihomeAdornDraggableItem";

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
  // ----------------------------------------
  const [item, setItem] = useState<ItemData>();
  const handleItem = (data:ItemData) => {
    setItem(data);
  };
  const [background, setBackground] = useState<BackgroundItemData>();
  const handleBackground = (data: BackgroundItemData) => {
    setBackground(data);
  };
  const nodeRef = useRef(null);
  // const draggableItems = item.map((e) => (
  //   <MinihomeAdornDraggableItem key={e.itemId} data={e} />
  // ));
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <aside className={style.aside}>
          <div className={style.aside_wrapper}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
              // className={style.header_button}
            ></Button>
            <h1 className={style.aside_title}>미니홈 꾸미기</h1>
          </div>
          {/* 저장 버튼 공용 컴포넌트 사용 및 기능 구현하기 */}
          <button className={style.aside_save}>저장하기</button>
        </aside>
        <section className={style.section}>
          <header className={style.header}>
            <img
              className={style.header_background}
              src={useImage(background?.imageUrl as string)}
              alt=""
            />
            {/* {draggableItems} */}
            <Draggable bounds="parent" nodeRef={nodeRef}>
              <div ref={nodeRef}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={useImage(item?.imageUrl as string)}
                  alt=""
                />
              </div>
            </Draggable>
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
                배경 요소
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
