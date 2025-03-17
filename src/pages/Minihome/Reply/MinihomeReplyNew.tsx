import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useUserStore } from "@store/store";
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
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  // const [replys, setReplys] = useState<ReplyData[]>([]);
  const [pageReplys, setPageReplys] = useState<ReplyData[]>([]);
  const [pageNum1, setPageNum1] = useState<number>(0);
  const { nickname } = useParams<{ nickname: string }>();
  usePageTitle(`미니홈 - ${nickname}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplySendData>(); //useForm의 타입과 handleSubmit에 들어가는 form 제출 함수의 매개변수 타입을 일치 시켜주어야 한다.

  const onSubmit = async (formData: ReplySendData) => {
    try {
      await fetch(`${SERVER_API}/guestbooks/${nickname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          content: formData.content,
        }),
      });
      getPageReply();
      reset(); // 댓글 입력 후 입력창 초기화
    } catch (error) {
      console.error(error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(0);
  const getPageReply = async () => {
    try {
      const response = await fetch(
        `${SERVER_API}/guestbooks/${nickname}?sort=createdAt,desc&page=${currentPage}&size=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      setPageNum1(data?.data?.totalPages);
      setPageReplys(data?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPageReply();
  }, [currentPage, nickname]); // 외부에서 미니홈으로 페이지 접속하였을 때 params 값의 변함에 따른 미니홈 정보 리렌더링 및 재호출

  const replyList = pageReplys?.map((e) => (
    <MinihomeReplyItem
      key={e.guestbookId}
      replys={e}
      getPageReply={getPageReply}
    />
  ));
  const pageNum = () => {
    const numList = [];
    for (let i = 0; i < pageNum1; i++) {
      numList.push(
        <li
          className={currentPage == i ? style.active_pageNum : style.pageNum}
          value={i}
          key={i}
          onClick={() => setCurrentPage(i)}
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
