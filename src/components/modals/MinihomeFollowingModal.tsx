import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useFollowingModalState, useUserStore } from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";

import MinihomeFollowingItem from "@pages/Minihome/Header/MinihomeFollowingItem";
import style from "@styles/Layouts/modals/MinihomeFollowModal.module.css";
import { Followings } from "types/minihome";


function MinihomeFollowingModal() {
  // {
  //   handleFollowingClose,
  // }: {
  //   handleFollowingClose: () => void;
  // },
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const user = useUserStore((state) => state.user);
  const modalClose = useFollowingModalState((state) => state.modalClose);
  const { nickname } = useParams<{ nickname: string }>();
  const axios = useCustomAxios();
  const following = async () => {
    const response = await axios.get(
      `${SERVER_API}/users/${nickname}/followings`,
    );
    return response?.data;
  };
  const { data } = useQuery({
    queryKey: ["Followings", nickname, user],
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
          <button onClick={modalClose} className={style.header_close}>
            X
          </button>
        </header>
        <section className={style.section}>{followingList}</section>
      </main>
    </div>
  );
}

export default MinihomeFollowingModal;
