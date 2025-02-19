import React, { useState } from "react";

import { useUserStore } from "@store/store";
import MinihomeReplyEdit from "./MinihomeReplyEdit";
import useImage from "@hooks/useImage";
import style from "@styles/Minihome/MinihomeReplyItem.module.css";

interface ReplyData {
  content: string;
  createAt: string;
  guestbookId: number;
  isAuthor: boolean;
  nickname: string;
}

function MinihomeReplyItem({
  replys,
  getPageReply,
}: {
  replys: ReplyData;
  getPageReply: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const editReply = () => {
    setIsEdit(!isEdit);
  };

  const deleteReply = async () => {
    if (confirm("댓글을 삭제할까요?")) {
      await fetch(
        `${SERVER_API}/guestbooks/${replys?.guestbookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      getPageReply();
    }
    return;
  };
  const replyTime = () => {
    const time = replys?.createAt;
    const pattern = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/;
    const resultTime = time.match(pattern);
    if (resultTime) {
      return `${resultTime[1]} ${resultTime[2]}`;
    }
  };
  
  return (
    <div className={style.main_reply}>
      <header className={style.main_reply_header}>
        <div className={style.main_reply_user}>
          <img src={useImage(user?.profileUrl)} alt="profile" />
          <p>{replys?.nickname}</p>
        </div>
        <p className={style.main_reply_date}>{replyTime()}</p>
      </header>
      <main className={style.main_reply_content}>
        <section className={style.main_reply_content_wrapper}>
          {isEdit ? (
            <MinihomeReplyEdit
              replys={replys}
              getPageReply={getPageReply}
              editReplyResult={editReply}
            />
          ) : (
            <p>{replys?.content}</p>
          )}
          <div className={style.main_buttons}>
            <button onClick={editReply}>{isEdit ? "취소" : "수정"}</button>
            {isEdit ? null : <button onClick={deleteReply}>삭제</button>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MinihomeReplyItem;
