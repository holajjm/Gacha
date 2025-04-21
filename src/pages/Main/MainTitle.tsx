import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainTitle({ article1Ref }: { article1Ref: Ref<HTMLDivElement> }) {
  return (
    <article ref={article1Ref} className={style.header}>
      <h1 className={style.title}>
        Welcome to the
        <br />
        GACHAGACHA!
      </h1>
      <h2 className={style.description}>아이템을 뽑아 꾸미고 거래하세요!</h2>
    </article>
  );
}

export default MainTitle;
