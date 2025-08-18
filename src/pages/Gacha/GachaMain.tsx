import React from "react";

import { useModalState } from "@store/store";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import Button from "@components/Button";

import GachaCapsule from "./GachaCapsule";
import style from "@styles/Gacha/GachaMain.module.css";
import { useGachaQuery } from "@features/gacha/useGachaQuery";

function GachaMain() {
  usePageTitle("가챠 뽑기");
  usePageUpper();
  const modal = useModalState((state) => state.modal);
  const modalOpen = useModalState((state) => state.modalOpen);
  const { data: gachaData, mutate: getGacha } = useGachaQuery();
  const handleGachaClick = () => {
    getGacha();
    modalOpen();
  };
  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>GACHA SHOP</h1>
          <p className={style.header_description}>랜덤 아이템을 뽑아봐요!</p>
        </header>
        <section className={style.section}>
          <div>
            <img
              src="/images/GachaMain.webp"
              alt="Gacha"
              width={320}
              height={320}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>
          <Button
            text={"아이템 뽑기"}
            width={"10rem"}
            onClick={handleGachaClick}
          ></Button>
        </section>
      </main>
      {modal ? <GachaCapsule itemImageUrl={gachaData?.itemImageUrl} /> : null}
    </div>
  );
}

export default GachaMain;
