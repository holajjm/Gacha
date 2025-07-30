import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProfileImg from "@constants/Profile.ts";
import Button from "@components/Button";
import { useFollowerDelete } from "@features/minihome/useFollowerDelete";
import { useUserStore } from "@store/store";
import style from "@styles/Minihome/Header/MinihomeFollowItem.module.css";

import { Followers } from "types/minihome";

function MiniHomeFollowerItem({ followers }: { followers: Followers }) {
  const user = useUserStore((state) => state.user);
  const { nickname } = useParams();
  const navigate = useNavigate();

  // 팔로워 삭제 로직
  const { mutate: deleteFollower } = useFollowerDelete({ followers });

  return (
    <article className={style.article}>
      <div
        onClick={() => {
          if (confirm(`${followers?.nickname} 미니홈에 방문할까요?`)) {
            navigate(`/minihome/${followers?.nickname}`);
            window.location.reload();
          }
        }}
        className={style.article_link}
      >
        <div className={style.article_img}>
          <img
            src={ProfileImg[followers?.profileId]?.profileImg}
            alt="profile"
            width={48}
            height={48}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <p className={style.article_nickname}>{followers?.nickname}</p>
      </div>

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
