import React from "react";
import { useForm } from "react-hook-form";

import { useEditQuery } from "@features/reply/useEditQuery";
import style from "@styles/Minihome/Reply/MinihomeReplyEdit.module.css";

import type { ReplyData, ReplySendData } from "types/minihome";

function MinihomeReplyEdit({
  replys,
  editReplyResult,
}: {
  replys: ReplyData;
  editReplyResult: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();

  const { mutate: editReply } = useEditQuery({ replys, editReplyResult });

  const editReplyForm = (formData: ReplySendData) => {
    editReply(formData);
  };

  return (
    <form className={style.edit_main} onSubmit={handleSubmit(editReplyForm)}>
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
