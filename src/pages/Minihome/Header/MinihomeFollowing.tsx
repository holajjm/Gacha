import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "@store/store";

import MinihomeFollowingItem from "./MinihomeFollowingItem";
import style from "@styles/Minihome/Header/MinihomeFollowing.module.css";

interface Followings {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
  isCurrentUser: boolean;
}

function MinihomeFollowing({
  handleFollowingClose,
}: {
  handleFollowingClose: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const [followings, setFollowings] = useState<Followings[]>([]);
  const getFollowing = async () => {
    const response = await fetch(`${SERVER_API}/users/${nickname}/followings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setFollowings(data?.data?.content);
  };
  useEffect(() => {
    getFollowing();
  }, []);
  const followingList = followings.map((e) => (
    <MinihomeFollowingItem key={e?.userId} followings={e} />
  ));
  return (
    <div className={style.container}>
      <div className={style.background}></div>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>팔로잉</h1>
          <button onClick={handleFollowingClose} className={style.header_close}>
            X
          </button>
        </header>
        <main className={style.main}>{followingList}</main>
      </section>
    </div>
  );
}

export default MinihomeFollowing;
