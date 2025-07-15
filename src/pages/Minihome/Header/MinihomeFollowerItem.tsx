import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFollowerModalState, useUserStore } from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";
import Button from "@components/Button";
import { toast } from "react-toastify";
import ProfileImg from "@constants/Profile.ts";

import style from "@styles/Minihome/Header/MinihomeFollowItem.module.css";
import { Followers } from "types/minihome";


function MiniHomeFollowerItem({ followers }: { followers: Followers }) {
  const { user } = useUserStore((state) => state);
  const { modalClose } = useFollowerModalState((state) => state);
  const { nickname } = useParams();
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 팔로워 삭제 로직
  const { mutate: deleteFollower } = useMutation({
    mutationFn: async () => {
      if (confirm("팔로워를 삭제할까요?")) {
        const response = await axios.delete(
          `/users/follower/${followers?.nickname}`,
        );
        console.log(response?.data);
        toast("삭제되었습니다.");
        modalClose();
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Followers"] });
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      console.log(data);
    },
  });

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
