import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useFollowerModalState, useUserStore } from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";

import MinihomeFollowerItem from "@pages/Minihome/Header/MinihomeFollowerItem";
import style from "@styles/Layouts/modals/MinihomeFollowModal.module.css";

interface Followers {
  userId: number;
  nickname: string;
  profileId: number;
  isFollowing: boolean;
  isRemovable: boolean;
  isCurrentUser: boolean;
}

function MinihomeFollowerModal() {
// {
//   handleFollowerClose,
// }: {
//   handleFollowerClose: () => void;
// },
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { modalClose } = useFollowerModalState((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const axios = useCustomAxios();
  const follower = async () => {
    const response = await axios.get(
      `${SERVER_API}/users/${nickname}/followers`,
    );
    return response?.data;
  };
  const { data } = useQuery({
    queryKey: ["Followers", nickname, user],
    queryFn: follower,
    select: (data) => data?.content,
    enabled: !!user,
  });
  // console.log(data);

  const followerList = data?.map((e: Followers) => (
    <MinihomeFollowerItem key={e?.userId} followers={e} />
  ));
  return (
    <div className={style.container}>
      <p className={style.background}></p>
      <main className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>팔로워</h1>
          <button onClick={modalClose} className={style.header_close}>
            X
          </button>
        </header>
        <section className={style.section}>{followerList}</section>
      </main>
    </div>
  );
}

export default MinihomeFollowerModal;
