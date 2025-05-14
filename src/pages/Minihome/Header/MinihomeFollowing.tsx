import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";

import MinihomeFollowingItem from "./MinihomeFollowingItem";
import style from "@styles/Minihome/Header/MinihomeFollowing.module.css";

interface Followings {
  isCurrentUser: boolean;
  isFollowing: boolean;
  nickname: string;
  profileId: number;
  userId: number;
}

function MinihomeFollowing({
  handleFollowingClose,
}: {
  handleFollowingClose: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const axios = useCustomAxios();
  const following = async () => {
    const response = await axios.get(
      `${SERVER_API}/users/${nickname}/followings`,
    );
    return response?.data;
  };
  const { data } = useQuery({
    queryKey: ["FollowingList", nickname, user],
    queryFn: following,
    select: (data) => data?.content,
    enabled: !!user,
  });
  // console.log(data);

  const followingList = data?.map((e: Followings) => (
    <MinihomeFollowingItem key={e?.userId} followings={e} />
  ));

  return (
    <div className={style.container}>
      <div className={style.background}></div>
      <main className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>팔로잉</h1>
          <button onClick={handleFollowingClose} className={style.header_close}>
            X
          </button>
        </header>
        <section className={style.section}>{followingList}</section>
      </main>
    </div>
  );
}

export default MinihomeFollowing;
