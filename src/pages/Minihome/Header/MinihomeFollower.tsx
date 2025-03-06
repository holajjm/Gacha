import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "@store/store";

import MinihomeFollowerItem from "./MinihomeFollowerItem";
import style from "@styles/Minihome/Header/MinihomeFollower.module.css";

interface Followers {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
  isRemovable: boolean;
  isCurrentUser: boolean;
}

function MinihomeFollower({
  handleFollowerClose,
}: {
  handleFollowerClose: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const [followers, setFollowers] = useState<Followers[]>([]);
  const getFollower = async () => {
    const response = await fetch(`${SERVER_API}/users/${nickname}/followers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setFollowers(data?.data?.content);
  };
  useEffect(() => {
    getFollower();
  }, []);
  const followerList = followers.map((e) => (
    <MinihomeFollowerItem key={e?.userId} followers={e} />
  ));
  return (
    <div className={style.container}>
      <div className={style.background}></div>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>팔로워</h1>
          <button onClick={handleFollowerClose} className={style.header_close}>
            X
          </button>
        </header>
        <main className={style.main}>{followerList}</main>
      </section>
    </div>
  );
}

export default MinihomeFollower;
