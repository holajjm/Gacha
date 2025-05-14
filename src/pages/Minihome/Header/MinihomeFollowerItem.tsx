import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useUserStore } from "@store/store";
import ProfileImg from "@assets/Profile";
import Button from "@components/Button";
import { toast } from "react-toastify";

import style from "@styles/Minihome/Header/MinihomeFollowerItem.module.css";

interface Followers {
  userId: number;
  nickname: string;
  profileId: number;
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
        toast("삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <article className={style.article}>
      <Link
        to={`/minihome/${followers?.nickname}`}
        className={style.article_link}
      >
        <div className={style.article_img}>
          <img
            src={ProfileImg[followers?.profileId]?.profileImg}
            alt="profile"
          />
        </div>
        <p className={style.article_nickname}>{followers?.nickname}</p>
      </Link>

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
          onClick={() => {
            if (confirm(`${followers?.nickname} 미니홈에 방문할까요?`)) {
              navigate(`/minihome/${followers?.nickname}`);
              window.location.reload();
            }
            return;
          }}
        ></Button>
      )}
    </article>
  );
}

export default MiniHomeFollowerItem;
