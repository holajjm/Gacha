import React from "react";
import { useForm } from "react-hook-form";

import { useUserStore } from "@store/store";

import style from "@styles/Minihome/Reply/MinihomeReplyEdit.module.css";

interface ReplySendData {
  content: string;
}
interface ReplyData {
  content: string;
  createAt: string;
  guestbookId: number;
  isAuthor: boolean;
  nickname: string;
}
function MinihomeReplyEdit({
  replys,
  getPageReply,
  editReplyResult,
}: {
  replys: ReplyData;
  getPageReply: () => void;
  editReplyResult: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();
  const editReply = async (formData: ReplySendData) => {
    if (confirm("수정하시겠습니까?")) {
      await fetch(`${SERVER_API}/guestbooks/${replys?.guestbookId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formData.content,
        }),
      });
      getPageReply();
      editReplyResult();
    }
    return;
  };
  console.log(errors);

  return (
    <form className={style.edit_main} onSubmit={handleSubmit(editReply)}>
      <input
        type="text"
        placeholder="댓글 수정하기"
        {...register("content", { required: "내용을 입력해주세요" })}
      />
      <div className={style.edit_bottom}>
        <button className={style.edit_button}>수정</button>
        <p className={style.edit_button} onClick={editReplyResult}>
          취소
        </p>
      </div>
      <p className={style.edit_error}>{errors?.content?.message}</p>
    </form>
  );
}

export default MinihomeReplyEdit;
