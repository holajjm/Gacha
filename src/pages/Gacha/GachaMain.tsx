import React, { useState } from "react";
import { useUserStore } from "@store/store";

import GachaCapsule from "./GachaCapsule";
import style from "@styles/Gacha/GachaMain.module.css";
import Coin from "@components/Coin";
import Button from "@components/Button";

interface GachaData {
  itemGrade: string;
  itemImageUrl: string;
  itemName: string;
}

function GachaMain() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);
  const [gachaData, setGachaData] = useState<GachaData>({
    itemGrade: "",
    itemImageUrl: "",
    itemName: "",
  });
  const getGacha = async () => {
    const response = await fetch(`${SERVER_API}/gacha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.text();
    console.log(JSON.parse(data)?.data);
    setGachaData(JSON.parse(data)?.data);
  };
  const handleGachaClick = () => {
    getGacha();
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false)
  }
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <Coin />
        <header className={style.header}>
          <h1>GACHA SHOP</h1>
          <p>랜덤 아이템을 뽑아봐요!</p>
        </header>
        <main className={style.main}>
          <div>
            <img src="/images/GachaSample.svg" alt="Gacha" />
          </div>
          <Button text={"아이템 뽑기"} width={"10rem"} onClick={handleGachaClick}></Button>
        </main>
      </section>
      {open ? <GachaCapsule imageData={gachaData} onClick={handleModalClose} /> : null}
    </div>
  );
}

export default GachaMain;
