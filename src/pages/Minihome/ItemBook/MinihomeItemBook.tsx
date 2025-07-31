import React, { useState } from "react";

import Button from "@components/Button";
import ItemListSkeleton from "@components/skeleton/ItemListSkeleton";
import { useItemBookQuery } from "@features/minihome/useItemBookQuery";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import style from "@styles/Minihome/ItemBook/MinihomeItemBook.module.css";

import MinihomeItems from "./MinihomeItems";
import { SlArrowLeft } from "react-icons/sl";
import type { ItemBookData } from "types/minihome";
import ItemListNavbar from "@components/ItemListNavbar";

function MinihomeItemBook() {
  usePageTitle("MiniHome - ItemBook");
  usePageUpper();
  const [click, setClick] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const text = click ? `?grade=${click}` : click;
  const { data: itemList, isLoading } = useItemBookQuery({ text });
  // console.log(itemList);

  const items = itemList?.map((e: ItemBookData) => (
    <MinihomeItems key={e.itemId} data={e} />
  ));
  return (
    <main className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
          ></Button>
          <h1 className={style.header_title}>아이템 북 관리</h1>
        </header>
        <section className={style.section}>
          <ItemListNavbar
            handleClick={handleClick}
            click={click}
            type={"itembook"}
          />
          <article className={style.article}>
            {!isLoading ? <>{items}</> : <ItemListSkeleton />}
          </article>
        </section>
      </section>
    </main>
  );
}

export default MinihomeItemBook;
