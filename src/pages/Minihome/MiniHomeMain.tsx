import React, { useEffect, useState } from "react";
import style from "@styles/Minihome/MiniHomeMain.module.css";
import MinihomeReplyNew from "./MinihomeReplyNew";
import MinihomeHeader from "./Header/MinihomeHeader";
import { useUserStore } from "@store/store";

interface MiniHomeMainData {
  followersCnt: number;
  followingCnt: number;
  isOwner: boolean;
  layout: null;
  nickname: string;
  profileImageUrl: string;
  score: number;
  totalVisitorCnt: number;
}

function MiniHomeMain() {
  const { user } = useUserStore((state) => state);
  // console.log(user);
  
  const [minihomeData, setMinihomeData] = useState<MiniHomeMainData>({
    followersCnt: 0,
    followingCnt: 0,
    isOwner: true,
    layout: null,
    nickname: "",
    profileImageUrl: "",
    score: 0,
    totalVisitorCnt: 0,
  });
  const getMinihomeInfo = async () => {
    if (!user?.accessToken) {
      console.warn("User information is missing");
      return;
    }
    try {
      const response = await fetch(
        `https://222.121.46.20:80/minihomes/${user && user?.nickname}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user && user?.accessToken}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `http://localhost:5173`,
            "Access-Control-Allow-Credentials": "true",
          },
        },
      );
      const data = await response.json();
      // console.log(data);
      setMinihomeData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMinihomeInfo();
  }, []);
  // console.log(minihomeData);

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <MinihomeHeader minihomeData={minihomeData} />
        <main className={style.main}>
          <aside className={style.main_people}>총 방문자 수 {minihomeData?.totalVisitorCnt ? minihomeData?.totalVisitorCnt : 0}</aside>
          <section className={style.main_section_1}>꾸민 모습</section>
          <section className={style.main_section_2}>
            <div className={style.background_section}></div>
            <MinihomeReplyNew />
          </section>
        </main>
      </section>
    </div>
  );
}

export default MiniHomeMain;
