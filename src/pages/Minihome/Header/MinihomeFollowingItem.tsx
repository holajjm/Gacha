import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProfileImg from "@constants/Profile.ts";
import Button from "@components/Button";
import { useUnfollowQuery } from "@features/minihome/useUnfollowQuery";
import { useFollowingModalState, useUserStore } from "@store/store.ts";
import style from "@styles/Minihome/Header/MinihomeFollowItem.module.css";

import type { Followings } from "types/minihome";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useCustomAxios from "@hooks/useCustomAxios";
// import { toast } from "react-toastify";

function MinihomeFollowingItem({ followings }: { followings: Followings }) {
  const user = useUserStore((state) => state.user);
  const modalClose = useFollowingModalState((state) => state.modalClose);
  const { nickname } = useParams();
  const navigate = useNavigate();
  const { mutate: unFollow } = useUnfollowQuery({ followings });

  // const axios = useCustomAxios();
  // const queryClient = useQueryClient();
  // const { mutate: unFollow } = useMutation({
  //   mutationFn: async () => {
  //     if (confirm(`${followings?.nickname}님을 언팔로우 할까요?`)) {
  //       const response = await axios.delete("/users/unfollow", {
  //         data: { followeeUserNickname: followings?.nickname },
  //       });
  //       // console.log(response?.data);
  //       toast("언팔로우 되었습니다.");
  //       modalClose();
  //       return response?.data;
  //     }
  //   },
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ["Followings"] });
  //     queryClient.invalidateQueries({ queryKey: ["Minihome"] });
  //     if (data?.error) {
  //       alert(data?.error?.message);
  //     }
  //     console.log(data);
  //   },
  // });

  return (
    <article className={style.article}>
      <div
        onClick={() => {
          if (confirm(`${followings?.nickname} 미니홈에 방문할까요?`)) {
            navigate(`/minihome/${followings?.nickname}`);
            modalClose();
          }
        }}
        className={style.article_link}
      >
        <div className={style.article_img}>
          <img
            src={ProfileImg[followings?.profileId]?.profileImg}
            alt="profile"
            width={48}
            height={48}
            {...{ fetchpriority: "high" }}
            decoding="async"
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
              modalClose();
            }
            return;
          }}
        ></Button>
      )}
    </article>
  );
}

export default MinihomeFollowingItem;
