import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCoinState, useUserStore } from "@store/store";
import Button from "@components/Button";
import useImage from "@hooks/useImage";

import MinihomeFollower from "./MinihomeFollower";
import MinihomeFollowing from "./MinihomeFollowing";
import style from "@styles/Minihome/Header/MinihomeHeader.module.css";
interface MiniHomeMainData {
  followersCnt: number;
  followingCnt: number;
  isOwner: boolean;
  layout: null;
  nickname: string;
  profileImageStoreFileName: string;
  score: number;
  totalVisitorCnt: number;
  isFollowing: boolean;
}

function MinihomeHeader({
  minihomeData,
  getMinihomeInfo,
}: {
  minihomeData: MiniHomeMainData;
  getMinihomeInfo: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();
  const [followerClick, setFollowerClick] = useState<boolean>(false);
  const [followingClick, setFollowingClick] = useState<boolean>(false);
  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    setFollowerClick(!followerClick);
  };
  const handleFollowingClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    setFollowingClick(!followingClick);
  };
  const handleFollowerClose = () => {
    setFollowerClick(false);
  };
  const handleFollowingClose = () => {
    setFollowingClick(false);
  };

  // 유저 팔로잉하기 기능
  const handleFollowing = async (minihomeData: MiniHomeMainData) => {
    if (!minihomeData?.nickname) {
      console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
      return;
    }
    if (confirm(`${minihomeData?.nickname}님을 팔로잉 하시겠습니까?`)) {
      try {
        await fetch(`${SERVER_API}/users/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            followeeUserNickname: minihomeData?.nickname,
          }),
        });
        getMinihomeInfo();
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 유저 언팔로우 기능
  const handleUnFollowing = async (minihomeData: MiniHomeMainData) => {
    if (confirm(`${minihomeData?.nickname}님을 언팔로우 하시겠습니까?`)) {
      try {
        await fetch(`${SERVER_API}/users/unfollow`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            followeeUserNickname: minihomeData?.nickname,
          }),
        });
        alert("언팔로우 되었습니다.");
        getMinihomeInfo();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 출석체크 및 코인 획득 로직
  const coinRefresh = useCoinState((state) => state.coinRefresh);
  const getAttend = async () => {
    const response = await fetch(`${SERVER_API}/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (!data?.data) {
      alert(data?.error?.message);
    } else {
      alert("출석 체크 완료!");
      coinRefresh();
    }
  };
  return (
    <header className={style.header}>
      {followerClick ? (
        <MinihomeFollower handleFollowerClose={handleFollowerClose} />
      ) : null}
      {followingClick ? (
        <MinihomeFollowing handleFollowingClose={handleFollowingClose} />
      ) : null}
      <p className={style.header_profile}>
        <img
          src={useImage(minihomeData?.profileImageStoreFileName)}
          alt="profile"
        />
      </p>
      <section className={style.section}>
        <header className={style.section_header}>
          <article className={style.section_article}>
            <h1 className={style.section_article_title}>{nickname}</h1>
            <div onClick={getAttend}>
              <img
                src="/images/NewCoin.svg"
                alt="coin"
                className={style.section_article_coin}
              />
              <p>출석체크하고 코인 받기!</p>
            </div>
          </article>
          <nav className={style.section_info}>
            <p>스코어 {minihomeData?.score ? minihomeData?.score : 0}</p>
            <p datatype="Follower" onClick={handleFollowerClick}>
              팔로워{" "}
              {minihomeData?.followersCnt ? minihomeData?.followersCnt : 0}
            </p>
            <p datatype="Following" onClick={handleFollowingClick}>
              팔로잉{" "}
              {minihomeData?.followingCnt ? minihomeData?.followingCnt : 0}
            </p>
          </nav>
        </header>
        {nickname === user?.nickname ? (
          <article className={style.section_bottom}>
            <Button
              text={"아이템 북 관리"}
              width={"100%"}
              onClick={() => navigate(`/minihome/itembook`)}
            ></Button>
            <Button
              text={"미니홈 꾸미기"}
              width={"100%"}
              onClick={() => navigate(`/minihome/adorn`)}
            ></Button>
          </article>
        ) : (
          <article className={style.section_bottom}>
            {minihomeData?.isFollowing ? (
              <Button
                text={"팔로우 끊기"}
                width={"100%"}
                onClick={() => handleUnFollowing(minihomeData)}
              ></Button>
            ) : (
              <Button
                text={"팔로잉하기"}
                width={"100%"}
                onClick={() => handleFollowing(minihomeData)}
              ></Button>
            )}
          </article>
        )}
      </section>
    </header>
  );
}

export default MinihomeHeader;
