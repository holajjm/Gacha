import React from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

import style from "@styles/Minihome/Header/MinihomeFollowerItem.module.css";

interface Followers {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
  isRemovable: boolean;
  isCurrentUser: boolean;
}

function MiniHomeFollowerItem({ followers }: { followers: Followers }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams();
  const deleteFollower = async () => {
    if (confirm("팔로워를 삭제할까요?")) {
      try {
        await fetch(`${SERVER_API}/users/follower/${followers?.nickname}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <li className={style.list}>
      <div>
        <img src={useImage(followers?.profileImageUrl)} alt="profile" />
      </div>
      <p>{followers?.nickname}</p>
      {nickname === user?.nickname ? (
        <Button
          text={"삭제"}
          width={"3.5rem"}
          onClick={deleteFollower}
        ></Button>
      ) : null}
    </li>
  );
}

export default MiniHomeFollowerItem;
