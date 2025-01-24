import React from "react";
import style from "@styles/Gacha/GachaMain.module.css";
import { useUserStore } from "@store/store";

function GachaMain() {
  const { user } = useUserStore((state) => state);
  const getGacha = async () => {
    const response = await fetch("https://222.121.46.20:80/gacha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.text();
    console.log(data);
  };
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.coin}>
          <img src="/images/coin.svg" alt="coin" />
          <p>19,500</p>
        </div>
        <header className={style.header}>
          <h1>GACHA SHOP</h1>
          <p>랜덤 아이템을 뽑아봐요!</p>
        </header>
        <main className={style.main}>
          <div>
            <img src="/images/GachaSample.svg" alt="Gacha" />
          </div>
          <button onClick={getGacha}>아이템 뽑기</button>
        </main>
      </section>
    </div>
  );
}

export default GachaMain;
