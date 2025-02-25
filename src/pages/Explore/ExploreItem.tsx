import React from "react";

import style from "@styles/Explore/ExploreItem.module.css";
import { useNavigate } from "react-router-dom";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

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
        <Button text={"방문"} width={"6rem"} onClick={() => navigate(`/minihome/${data?.nickname}`)}></Button>
      </div>
    </li>
  );
}

export default ExploreItem;
