import React, { useEffect, useState } from "react";
import style from "@styles/Minihome/Header/MinihomeFollowing.module.css";
import { useParams } from "react-router-dom";
import { useUserStore } from "@store/store";

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
    const response = await fetch(
      `${SERVER_API}/users/${nickname}/followings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    console.log(data);
    setFollowings(data?.content);
  };
  useEffect(() => {
    getFollowing();
  }, []);
  console.log("followings: ",followings);
  
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
        <main className={style.main}>
          <li className={style.list}>
            <div>
              {!user?.profileUrl ? <img src="" alt="profile" /> : <div></div>}
            </div>
            <p>holajjm</p>
            <button>삭제</button>
          </li>
          <li className={style.list}>
            <div>
              <img src="" alt="profile" />
            </div>
            <p>holajjm</p>
            <button>삭제</button>
          </li>
        </main>
      </section>
    </div>
  );
}

export default MinihomeFollowing;
