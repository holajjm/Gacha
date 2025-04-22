import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useCoinState, useUserStore } from "@store/store";

import Loading from "./Loading";
import style from "@styles/Layouts/Coin.module.css";
import useCustomAxios from "@hooks/useCustomAxios";

function Coin() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { coinUpdate } = useCoinState((state) => state);
  const axios = useCustomAxios();
  const getCoin = async () => {
    const response = await axios.get(`${SERVER_API}/coin`);
    // console.log(response?.data);
    return response?.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["coin", coinUpdate, user],
    queryFn: getCoin,
    select: data => data?.coin,
    refetchInterval: 1000 * 60
  });
// console.log(data);

  return (
    <div className={style.coin}>
      <img src="/images/NewCoin.webp" alt="coin" />
      {isLoading ? <Loading /> : <p>{data}</p>}
    </div>
  );
}

export default React.memo(Coin);
