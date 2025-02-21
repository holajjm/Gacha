import React from "react";

import useImage from "@hooks/useImage";
import style from "@styles/Minihome/Header/MinihomeFollowingItem.module.css";

interface Followings {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
  isCurrentUser: boolean;
}

function MinihomeFollowingItem({followings}:{followings:Followings}) {
  console.log(followings);
  
  return (
    <li className={style.list}>
      <div>
        <img src={useImage(followings?.profileImageUrl)} alt="profile" />
      </div>
      <p>{followings?.nickname}</p>
      <button>삭제</button>
    </li>
  );
}

export default MinihomeFollowingItem;
