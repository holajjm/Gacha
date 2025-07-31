import React, { useState } from "react";

import Button from "@components/Button";
import MinihomeItemSkeleton from "@components/skeleton/MinihomeItemSkeleton";
import { useItemBookQuery } from "@features/minihome/useItemBookQuery";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import style from "@styles/Minihome/ItemBook/MinihomeItemBook.module.css";

import MinihomeItems from "./MinihomeItems";
import { SlArrowLeft } from "react-icons/sl";
import type { ItemBookData } from "types/minihome";

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
          <nav onClick={handleClick}>
            <ul className={style.section_nav}>
              <li>
                <button
                  className={click === "" ? style.active_button : style.button}
                  datatype=""
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={click === "S" ? style.active_button : style.button}
                  datatype="S"
                >
                  S등급
                </button>
              </li>
              <li>
                <button
                  className={click === "A" ? style.active_button : style.button}
                  datatype="A"
                >
                  A등급
                </button>
              </li>
              <li>
                <button
                  className={click === "B" ? style.active_button : style.button}
                  datatype="B"
                >
                  B등급
                </button>
              </li>
              <li>
                <button
                  className={click === "C" ? style.active_button : style.button}
                  datatype="C"
                >
                  C등급
                </button>
              </li>
              <li>
                <button
                  className={click === "D" ? style.active_button : style.button}
                  datatype="D"
                >
                  D등급
                </button>
              </li>
            </ul>
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
      </section>
    </main>
  );
}

export default MinihomeItemBook;
