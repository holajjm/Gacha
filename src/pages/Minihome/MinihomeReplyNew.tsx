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
// interface GetReplyData {
//   content: ReplyData[],
//   empty: boolean,
//   first: boolean,
//   last: boolean,
//   number: number,
//   numberOfElements: number,
//   pageable: {
//     offset: number,
//     pageNumber: number,
//     pageSize: number,
//     paged: boolean,
//     sort: {
//       unsorted: boolean,
//       sorted: boolean,
//       empty: boolean
//     }
//   }
//   size: number,
//   sort: {
//     unsorted: boolean,
//     sorted: boolean,
//     empty: boolean
//   }
// }
function MinihomeReplyNew() {
  const [replys, setReplys] = useState<ReplyData[]>([]);
  const { nickname } = useParams<{ nickname: string }>();
  const { user } = useUserStore((state) => state);
  // console.log("user :",user);
  // console.log("nickname :",nickname);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplySendData>();

  //useForm의 타입과 handleSubmit에 들어가는 form 제출 함수의 매개변수 타입을 일치 시켜주어야 한다.

  const onSubmit = async (formData:ReplySendData) => {
    try {
      await fetch(`https://222.121.46.20:80/guestbooks/${nickname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          content: formData.content,
        }),
      });
      getReply();
    } catch (error) {
      console.error(error)
    }
  };
  const getReply = async () => {
    try {
      const response = await fetch(
        `https://222.121.46.20:80/guestbooks/${nickname}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      // console.log(data);
      setReplys(data?.content);
    } catch (error) {
      console.error(error)
    }
  };

  // console.log(replys);
  
  useEffect(() => {
    getReply();
  }, []);
  
  const replyList = replys?.map((e) => (
    <MinihomeReplyItem key={e.guestbookId} replys={e} getReply={getReply}/>
  ));
  
  return (
    <div className={style.main_reply}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.main_reply_input}
      >
        <input
          type="text"
          placeholder="방명록을 남겨보세요"
          {...register("content", { required: "내용을 입력해주세요" })}
        />
        <button>등록</button>
        <p className={style.main_replyError}>
          {errors.content?.message}
        </p>
      </form>
      <main className={style.main_replyList}>{replyList}</main>
    </div>
  );
}

export default MinihomeReplyNew;
