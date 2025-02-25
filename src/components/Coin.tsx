import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Loading from "./Loading";
import { useUserStore } from "@store/store";
import style from "@styles/Layouts/Coin.module.css";

function Coin() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const getCoin = async () => {
    const response = await axios.get(`${SERVER_API}/coin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["coin"],
    queryFn: getCoin,
    select: (data) => data?.data?.data,
  });
  // console.log(data);
  if (isLoading) return <Loading />;
  return (
    <div className={style.coin}>
      <img src="/images/coin.svg" alt="coin" />
      <p>{data?.coin}</p>
    </div>
  );
}

export default React.memo(Coin);
