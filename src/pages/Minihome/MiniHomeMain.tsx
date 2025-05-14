import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import useCustomAxios from "@hooks/useCustomAxios";
import useImage from "@hooks/useImage";

import MinihomeReplyNew from "./Reply/MinihomeReplyNew";
import MinihomeHeader from "./Header/MinihomeHeader";
import MiniHomeItem from "./MiniHomeItem";
import style from "@styles/Minihome/MiniHomeMain.module.css";

interface AdornDataItem {
  imageUrl: string;
  subId: number;
  x: number;
  y: number;
}

function MiniHomeMain() {
  usePageTitle("MiniHome");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const axios = useCustomAxios();

  // 미니홈 유저 정보 호출
  const getMinihome = async () => {
    const response = await axios.get(
      `${SERVER_API}/minihomes/${nickname && nickname}`,
    );
    return response?.data;
  };
  const { data: minihomeData } = useQuery({
    queryKey: ["Minihome", user, nickname],
    queryFn: getMinihome,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
  // console.log(data);

  //꾸미기 데이터 호출
  const adorn = async () => {
    const response = await axios.get(`${SERVER_API}/decoration/${nickname}`);
    return response?.data;
  };
  const { data: adornData } = useQuery({
    queryKey: ["AdornData", user, nickname],
    queryFn: adorn,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
  // console.log(adornData);

  const itemList = adornData?.items?.map((e: AdornDataItem) => (
    <MiniHomeItem
      key={e?.subId}
      imageUrl={e?.imageUrl}
      positionX={e?.x}
      positionY={e?.y}
    />
  ));

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <MinihomeHeader minihomeData={minihomeData} />
        <section className={style.section}>
          <aside className={style.section_aside}>
            총 방문자 수{" "}
            {minihomeData?.totalVisitorCnt ? minihomeData?.totalVisitorCnt : 0}
          </aside>
          <article className={style.section_article_1}>
            <div>
              <img
                src={useImage(adornData?.background?.imageUrl)}
                alt="Background"
              />
            </div>
            <div className={style.section_article_1_imgList}>{itemList}</div>
          </article>
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
