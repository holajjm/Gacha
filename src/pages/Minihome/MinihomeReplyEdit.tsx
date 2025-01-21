import React from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "@store/store";
import style from "@styles/Minihome/MinihomeReplyEdit.module.css";

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
  getReply,
  editReplyResult,
}: {
  replys: ReplyData;
  getReply: () => void;
  editReplyResult: () => void;
}) {
  const { user } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();
  const editReply = async (formData: ReplySendData) => {
    if (confirm("수정하시겠습니까?")) {
      await fetch(
        `https://222.121.46.20:80/guestbooks/${replys?.guestbookId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: formData.content,
          }),
        },
      );
      getReply();
      editReplyResult();
    }
    return;
  };
  return (
    <form className={style.edit_main} onSubmit={handleSubmit(editReply)}>
      <input
        type="text"
        placeholder="댓글 수정하기"
        {...register("content", { required: "내용을 입력해주세요" })}
      />
      <button>수정</button>
      <p>{errors.content?.message}</p>
    </form>
  );
}

export default MinihomeReplyEdit;
