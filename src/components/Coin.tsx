import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useCoinState, useUserStore } from "@store/store";

import Loading from "./Loading";
import style from "@styles/Layouts/Coin.module.css";

function Coin() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { coinUpdate } = useCoinState((state) => state);
  const getCoin = async () => {
    const response = await axios.get(`${SERVER_API}/coin`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["coin", coinUpdate],
    queryFn: getCoin,
    select: (data) => data?.data?.data,
  });

  return (
    <div className={style.coin}>
      <img src="/images/NewCoin.svg" alt="coin" />
      {isLoading ? <Loading /> : <p>{data?.coin}</p>}
    </div>
  );
}

export default React.memo(Coin);
