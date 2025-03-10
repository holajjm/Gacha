import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "@store/store";
import usePageUpper from "@hooks/usePageUpper";
import Coin from "@components/Coin";

import MinihomeReplyNew from "./Reply/MinihomeReplyNew";
import MinihomeHeader from "./Header/MinihomeHeader";
import style from "@styles/Minihome/MiniHomeMain.module.css";

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

function MiniHomeMain() {
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const [minihomeData, setMinihomeData] = useState<MiniHomeMainData>({
    followersCnt: 0,
    followingCnt: 0,
    isOwner: true,
    layout: null,
    nickname: "",
    profileImageStoreFileName: "",
    score: 0,
    totalVisitorCnt: 0,
    isFollowing: false,
  });
  const getMinihomeInfo = async () => {
    if (!user?.accessToken) {
      console.warn("User information is missing");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_API}/minihomes/${nickname && nickname}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user && user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      setMinihomeData(data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMinihomeInfo();
  }, [nickname]); // 외부에서 미니홈으로 페이지 접속하였을 때 params 값의 변함에 따른 미니홈 정보 리렌더링 및 재호출

  return (
    <div className={style.container}>
      <Coin />
      <main className={style.wrapper}>
        <MinihomeHeader
          minihomeData={minihomeData}
          getMinihomeInfo={getMinihomeInfo}
        />
        <section className={style.section}>
          <aside className={style.section_aside}>
            총 방문자 수{" "}
            {minihomeData?.totalVisitorCnt ? minihomeData?.totalVisitorCnt : 0}
          </aside>
          <article className={style.section_article_1}></article>
          <article className={style.section_article_2}>
            <p className={style.section_article_2_background}></p>
            <MinihomeReplyNew />
          </article>
        </section>
      </main>
    </div>
  );
}

export default MiniHomeMain;
