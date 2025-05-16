import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUserStore } from "@store/store";
import Button from "@components/Button";
import { toast } from "react-toastify";
import ProfileImg from "@assets/Profile";

import style from "@styles/Minihome/Header/MinihomeFollowingItem.module.css";

interface Followings {
  isCurrentUser: boolean;
  isFollowing: boolean;
  nickname: string;
  profileId: number;
  userId: number;
}

function MinihomeFollowingItem({ followings }: { followings: Followings }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams();
  const navigate = useNavigate();
  const unFollow = async () => {
    if (confirm(`${followings?.nickname}님을 언팔로우 할까요?`)) {
      await fetch(`${SERVER_API}/users/unfollow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          followeeUserNickname: followings?.nickname,
        }),
      });
      toast("언팔로우 되었습니다.");
      window.location.reload();
    }
  };
  // console.log(followings);

  return (
    <article className={style.article}>
      <div
        onClick={() => {
          if (confirm(`${followings?.nickname} 미니홈에 방문할까요?`)) {
            navigate(`/minihome/${followings?.nickname}`);
            window.location.reload();
          }
        }}
        className={style.article_link}
      >
        <div className={style.article_img}>
          <img
            src={ProfileImg[followings?.profileId]?.profileImg}
            alt="profile"
          />
        </div>
        <p className={style.article_nickname}>{followings?.nickname}</p>
      </div>
      {nickname === user?.nickname ? (
        <Button text={"언팔로우"} width={"4rem"} onClick={unFollow}></Button>
      ) : (
        <Button
          text={"방문"}
          width={"3.5rem"}
          onClick={() => {
            if (confirm(`${followings?.nickname} 미니홈에 방문할까요?`)) {
              navigate(`/minihome/${followings?.nickname}`);
              window.location.reload();
            }
            return;
          }}
        ></Button>
      )}
    </article>
  );
}

export default MinihomeFollowingItem;
