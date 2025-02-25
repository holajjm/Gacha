import React, { useState } from "react";
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css";
import MinihomeAdornBackground from "./MinihomeAdornBackground";
import MinihomeAdornItemList from "./MinihomeAdornItemList";
import Button from "@components/Button";

function MinihomeAdorn() {
  const [active, setActive] = useState<string | null>("BACKGROUND");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive((e.target as HTMLElement).getAttribute("datatype"));
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <aside className={style.aside}>
          <Button
            text={"뒤로 가기"}
            width={"20%"}
            onClick={() => window.history.back()}
            // className={style.aside_button}
          ></Button>
          {/* 저장 버튼 공용 컴포넌트 사용 및 기능 구현하기 */}
          <button className={style.aside_save}>저장하기</button>
        </aside>
        <section className={style.section}>
          <header className={style.header}>꾸민 모습</header>
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
              <MinihomeAdornBackground />
            ) : (
              <MinihomeAdornItemList />
            )}
          </main>
        </section>
      </div>
    </div>
  );
}

export default MinihomeAdorn;
