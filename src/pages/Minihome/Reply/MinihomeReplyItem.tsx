import React, { useState } from "react";

import ProfileImg from "@constants/Profile.ts";
import { useReplyDelete } from "@features/reply/useReplyDelete";
import { TimeDiff } from "@hooks/TimeDiff";
import { useUserStore } from "@store/store";
import style from "@styles/Minihome/Reply/MinihomeReplyItem.module.css";

import MinihomeReplyEdit from "./MinihomeReplyEdit";
import { ReplyItemData } from "types/minihome";

function MinihomeReplyItem({ replys }: { replys: ReplyItemData }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const editReply = () => {
    setIsEdit(!isEdit);
  };

  const { mutate: deleteReply } = useReplyDelete({ replys });
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
            width={36}
            height={36}
            {...{ fetchpriority: "high" }}
            decoding="async"
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
