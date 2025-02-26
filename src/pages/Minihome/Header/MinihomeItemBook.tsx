import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";

import { SlArrowLeft } from "react-icons/sl";
import MinihomeItems from "./MinihomeItems";
import Button from "@components/Button";
import style from "@styles/Minihome/Header/MinihomeItemBook.module.css";
import usePageTitle from "@hooks/usePageTitle";

interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}

function MinihomeItemBook() {
  usePageTitle("아이템 북 관리");
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<ItemBookData[]>([]);
  const [click, setClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = click ? `?grade=${click}` : click;
  const getItemList = async () => {
    const response = await fetch(
      `${SERVER_API}/items/${user?.nickname}${text && text}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setItemList(data?.data);
  };
  useEffect(() => {
    getItemList();
  }, [click]);
  const items = itemList.map((e) => <MinihomeItems key={e.itemId} data={e} />);
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
            // className={style.header_button}
          ></Button>
          <h1 className={style.header_title}>아이템 북 관리</h1>
        </header>
        <main className={style.main}>
          <nav onClick={handleClick} className={style.main_nav}>
            <button
              className={click === "" ? style.active_button : style.button}
              datatype=""
            >
              All
            </button>
            <button
              className={click === "S" ? style.active_button : style.button}
              datatype="S"
            >
              S등급
            </button>
            <button
              className={click === "A" ? style.active_button : style.button}
              datatype="A"
            >
              A등급
            </button>
            <button
              className={click === "B" ? style.active_button : style.button}
              datatype="B"
            >
              B등급
            </button>
            <button
              className={click === "C" ? style.active_button : style.button}
              datatype="C"
            >
              C등급
            </button>
            <button
              className={click === "D" ? style.active_button : style.button}
              datatype="D"
            >
              D등급
            </button>
          </nav>
          <section className={style.main_contents}>
            <div className={style.main_contents_wrapper}>{items}</div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MinihomeItemBook;
