import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button";

import style from "@styles/Explore/ExploreItem.module.css";
import ProfileImg from "@assets/Profile";

interface ExploreItemData {
  profileId: number;
  nickname: string;
  totalVisitorCnt: number;
  likeCount: number;
}

function ExploreItem({ data }: { data: ExploreItemData }) {
  const navigate = useNavigate();
  return (
    <li className={style.list}>
      <p className={style.list_background}></p>
      <div>
        <img
          src={ProfileImg[Number(data?.profileId - 1)]?.profileImg}
          alt="profile"
        />
      </div>
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
