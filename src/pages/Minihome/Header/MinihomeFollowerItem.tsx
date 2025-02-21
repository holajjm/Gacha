import React from "react";

import style from "@styles/Minihome/Header/MiniHomeFollowerItem.module.css";
import useImage from "@hooks/useImage";

interface Followers {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
  isRemovable: boolean;
  isCurrentUser: boolean;
}

function MiniHomeFollowerItem({followers}:{followers:Followers}) {
  console.log(followers);
  
  return (
    <li className={style.list}>
      <div>
        <img src={useImage(followers?.profileImageUrl)} alt="profile" />
      </div>
      <p>{followers?.nickname}</p>
      <button>삭제</button>
    </li>
  );
}

export default MiniHomeFollowerItem;
