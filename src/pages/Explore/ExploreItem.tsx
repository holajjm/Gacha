import React from "react";

import style from "@styles/Explore/ExploreItem.module.css";
import { useNavigate } from "react-router-dom";
import useImage from "@hooks/useImage";

interface ExploreItemData {
  profileImageStoreFileName: string,
  nickname: string,
  totalVisitorCnt: number
}

function ExploreItem({data}:{data:ExploreItemData}) {
  const navigate = useNavigate();

  return (
    <li className={style.main_list}>
      <div className={style.main_background}></div>
      <div>
        <img src={useImage(data?.profileImageStoreFileName)} alt="profile" />
      </div>
      <div>{data?.nickname}</div>
      <div>{data?.totalVisitorCnt}</div>
      <div>
        <button onClick={() => navigate(`/minihome/${data?.nickname}`)}>방문</button>
      </div>
    </li>
  );
}

export default ExploreItem;
