import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
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
    <article className={style.article}>
      <div className={style.article_img}>
        <img src={useImage(followers?.profileImageUrl)} alt="profile" />
      </div>
      <p className={style.article_nickname}>{followers?.nickname}</p>
      {nickname === user?.nickname ? (
        <Button
          text={"삭제"}
          width={"3.5rem"}
          onClick={deleteFollower}
        ></Button>
      ) : (
        <Button
          text={"방문"}
          width={"3.5rem"}
          onClick={() => navigate(`/minihome/${followers?.nickname}`)}
        ></Button>
      )}
    </article>
  );
}

export default MiniHomeFollowerItem;
