import React from "react";
import { useNavigate } from "react-router-dom";

import useImage from "@hooks/useImage";
import Button from "@components/Button";

import style from "@styles/Explore/ExploreItem.module.css";

interface ExploreItemData {
  profileImageStoreFileName: string;
  nickname: string;
  totalVisitorCnt: number;
}

function ExploreItem({ data }: { data: ExploreItemData }) {
  const navigate = useNavigate();
  return (
    <li className={style.list}>
      <p className={style.list_background}></p>
      <p>
        <img src={useImage(data?.profileImageStoreFileName)} alt="profile" />
      </p>
      <p>{data?.nickname}</p>
      <p>{data?.totalVisitorCnt}</p>
      <p>
        <Button
          text={"방문"}
          width={"6rem"}
          onClick={() => navigate(`/minihome/${data?.nickname}`)}
        ></Button>
      </p>
    </li>
  );
}

export default ExploreItem;
