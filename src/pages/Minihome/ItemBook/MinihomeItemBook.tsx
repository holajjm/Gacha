import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MinihomeItems from "./MinihomeItems";
import MinihomeItemSkeleton from "@components/skeleton/MinihomeItemSkeleton";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Minihome/ItemBook/MinihomeItemBook.module.css";

interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}

function MinihomeItemBook() {
  usePageTitle("MiniHome - ItemBook");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const [click, setClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = click ? `?grade=${click}` : click;

  const getItemList = async () => {
    const response = await axios.get(
      `${SERVER_API}/itembook/${user?.nickname}${text && text}`,
    );
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["Items", text, user],
    queryFn: getItemList,
    select: (data) => data?.data,
  });
  // console.log(data);

  // const getItemList = async () => {
  //   const response = await fetch(
  //     `${SERVER_API}/itembook/${user?.nickname}${text && text}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.accessToken}`,
  //       },
  //     },
  //   );
  //   const data = await response.json();
  //   setItemList(data?.data);
  // };
  // useEffect(() => {
  //   getItemList();
  // }, [click]);
  const items = data?.map((e: ItemBookData) => (
    <MinihomeItems key={e.itemId} data={e} />
  ));
  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
          ></Button>
          <h1 className={style.header_title}>아이템 북 관리</h1>
        </header>
        <section className={style.section}>
          <nav onClick={handleClick} className={style.section_nav}>
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
          <article className={style.section_article}>
            {!isLoading ? (
              <section className={style.section_article_section}>
                {items}
              </section>
            ) : (
              <MinihomeItemSkeleton />
            )}
          </article>
        </section>
      </main>
    </div>
  );
}

export default MinihomeItemBook;
