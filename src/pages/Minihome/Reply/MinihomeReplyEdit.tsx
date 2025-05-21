import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { toast } from "react-toastify";

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
  editReplyResult,
}: {
  replys: ReplyData;
  editReplyResult: () => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();

  const { mutate: editReply } = useMutation({
    mutationFn: async (formData: ReplySendData) => {
      if (confirm("수정하시겠습니까?")) {
        const response = await axios.put(`/guestbooks/${replys?.guestbookId}`, {
          content: formData.content,
        });
        return response?.data;
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["Replys"] });
      toast("수정되었습니다.");
      editReplyResult();
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
