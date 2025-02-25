import React, { useEffect, useState } from "react";
import MinihomeReplyItem from "./MinihomeReplyItem";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUserStore } from "@store/store";
import style from "@styles/Minihome/MinihomeReplyNew.module.css";

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
// interface ReplyTotalData {
//   content: ReplyData[];
//   empty: boolean;
//   first: boolean;
//   last: boolean;
//   number: number;
//   numberOfElements: number;
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//     sort: { empty: string; sorted: string; unsorted: string };
//     offset: number;
//     unpaged: boolean;
//   };
//   size: number;
//   sort: { unsorted: boolean; sorted: boolean; empty: boolean };
//   totalElements: number;
//   totalPages: number;
// }
function MinihomeReplyNew() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  // const [replys, setReplys] = useState<ReplyData[]>([]);
  const [pageReplys, setPageReplys] = useState<ReplyData[]>([]);
  const [pageNum1, setPageNum1] = useState<number>(0);
  const { nickname } = useParams<{ nickname: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();

  //useForm의 타입과 handleSubmit에 들어가는 form 제출 함수의 매개변수 타입을 일치 시켜주어야 한다.

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
    } catch (error) {
      console.error(error);
    }
  };

  // const getReply = async () => {
  //   try {
  //     const response = await fetch(
  //       `${SERVER_API}/guestbooks/${nickname}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user?.accessToken}`,
  //         },
  //       },
  //     );
  //     const data = await response.json();
  //     setReplys(data?.content);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getReply();
  // }, []);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const getPageReply = async () => {
    try {
      const response = await fetch(
        `${SERVER_API}/guestbooks/${nickname}?sorted=createdAt,desc&page=${currentPage}&size=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      console.log(data?.data);
      
      setPageNum1(data?.data?.totalPages);
      setPageReplys(data?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPageReply();
  }, [currentPage]);

  // const replyList = replys?.map((e) => (
  //   <MinihomeReplyItem key={e.guestbookId} replys={e} getReply={getReply} />
  // ));
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
        <button>등록</button>
        <p className={style.main_replyError}>{errors.content?.message}</p>
      </form>
      <main className={style.main_replyList}>{replyList}</main>
      <ul className={style.pageList}>{pageNum()}</ul>
    </div>
  );
}

export default MinihomeReplyNew;
