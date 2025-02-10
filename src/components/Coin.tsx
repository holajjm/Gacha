import React, { useEffect, useState } from "react";
import style from "@styles/Layouts/Coin.module.css";
import { useUserStore } from "@store/store";

function Coin() {
  const [coin, setCoin] = useState<number>(0);
  const { user } = useUserStore((state) => state);
  const getCoin = async () => {
    const response = await fetch("https://222.121.46.20:80/coin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setCoin(data?.coin);
  };
  useEffect(() => {
    getCoin();
  }, []);
  return (
    <div className={style.coin}>
      <img src="/images/coin.svg" alt="coin" />
      <p>{coin}</p>
    </div>
  );
}

export default Coin;
