import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { TimeDiff } from "@hooks/TimeDiff";
import ProfileImg from "@constants/Profile.ts";

import MinihomeReplyEdit from "./MinihomeReplyEdit";
import style from "@styles/Minihome/Reply/MinihomeReplyItem.module.css";
import { ReplyItemData } from "types/minihome";
import { useUserStore } from "@store/store";

function MinihomeReplyItem({ replys }: { replys: ReplyItemData }) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const editReply = () => {
    setIsEdit(!isEdit);
  };

  const { mutate: deleteReply } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(
          `/guestbooks/${replys?.guestbookId}`,
        );
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["Replys"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelete = () => {
    if (confirm("댓글을 삭제할까요?")) {
      deleteReply();
    }
  };

  return (
    <div className={style.main_reply}>
      <div className={style.main_reply_background}></div>
      <header className={style.main_reply_header}>
        <div className={style.main_reply_user}>
          <img
            src={
              replys?.profileId === -1
                ? "/images/LightDefaultImage.webp"
                : ProfileImg[replys?.profileId - 1]?.profileImg
            }
            alt="profile"
          />
          <p>{replys?.nickname}</p>
        </div>
        <p className={style.main_reply_date}>{TimeDiff(replys?.createAt)}</p>
      </header>
      <section className={style.main_reply_content}>
        {isEdit ? (
          <MinihomeReplyEdit replys={replys} editReplyResult={editReply} />
        ) : replys?.nickname === user.nickname ? (
          <div className={style.main_bottom}>
            <p>{replys?.content}</p>
            <div className={style.main_buttons}>
              <p onClick={editReply}>수정</p>
              <p onClick={handleDelete}>삭제</p>
            </div>
          </div>
        ) : (
          <div className={style.main_bottom}>
            <p>{replys?.content}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MinihomeReplyItem;
