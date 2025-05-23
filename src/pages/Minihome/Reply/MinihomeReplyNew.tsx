import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import Button from "@components/Button";

import MinihomeReplyItem from "./MinihomeReplyItem";
import style from "@styles/Minihome/Reply/MinihomeReplyNew.module.css";

interface ReplySendData {
  content: string;
}
interface ReplyData {
  content: string;
  createAt: string;
  guestbookId: number;
  isAuthor: boolean;
  nickname: string;
  profileId: number;
}
function MinihomeReplyNew() {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  usePageTitle(`미니홈 - ${nickname}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplySendData>(); //useForm의 타입과 handleSubmit에 들어가는 form 제출 함수의 매개변수 타입을 일치 시켜주어야 한다.

  const { mutate: enrollReply } = useMutation({
    mutationFn: async (formData: ReplySendData) => {
      try {
        const response = await axios.post(`/guestbooks/${nickname}`, {
          content: formData.content,
        });
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
      reset();
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
  const onSubmit = (formData: ReplySendData) => {
    enrollReply(formData);
  };

  const [page, setPage] = useState<number>(0);
  const getReplys = async ({ page }: { page: number }) => {
    const response = await axios.get(
      `/guestbooks/${nickname}?sort=createdAt,desc&page=${page}&size=3`,
    );
    return response?.data;
  };
  const { data } = useInfiniteQuery({
    queryKey: ["Replys", user, page, nickname],
    queryFn: () => getReplys({ page }),
    getNextPageParam: (lastPage) => {
      // console.log(lastPage);
      return lastPage;
    },
    initialPageParam: 0,
    enabled: !!user,
    staleTime: 1000 * 60 * 10,
  });
  // console.log(data?.pages[0]);
  const replyList = data?.pages[0]?.content?.map((e: ReplyData) => (
    <MinihomeReplyItem key={e.guestbookId} replys={e} />
  ));
  // console.log(replyList);

  const pageNum = () => {
    const numList = [];
    for (let i = 0; i < data?.pages[0]?.totalPages; i++) {
      numList.push(
        <li
          className={
            data?.pages[data?.pages.length - 1]?.pageable?.pageNumber == i
              ? style.active_pageNum
              : style.pageNum
          }
          value={i}
          key={i}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </li>,
      );
    }
    return numList;
  };

  return (
    <div className={style.main_reply}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.main_reply_input}
      >
        <div className={style.main_reply_input_background}></div>
        <input
          type="text"
          placeholder="방명록을 남겨보세요!"
          {...register("content", { required: "내용을 입력해주세요" })}
        />
        <Button text={"등록"} width={"5rem"} onClick={() => {}}></Button>
        <p className={style.main_replyError}>{errors.content?.message}</p>
      </form>
      <main className={style.main_replyList}>{replyList}</main>
      <ul className={style.pageList}>{pageNum()}</ul>
    </div>
  );
}

export default MinihomeReplyNew;
