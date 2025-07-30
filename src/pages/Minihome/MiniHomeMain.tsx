import React from "react";
import { useParams } from "react-router-dom";

import { useMinihomeData } from "@features/minihome/useMinihomeData";
import { useMinihomeAdorn } from "@features/minihome/useMinihomeAdorn";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import useImage from "@hooks/useImage";
import style from "@styles/Minihome/MiniHomeMain.module.css";

import MinihomeHeader from "./Header/MinihomeHeader";
import MiniHomeItem from "./MiniHomeItem";
import MinihomeReplyNew from "./Reply/MinihomeReplyNew";
import type { AdornDataItem } from "types/minihome";

function MiniHomeMain() {
  usePageTitle("MiniHome");
  usePageUpper();
  const { nickname } = useParams<{ nickname: string }>();

  // 미니홈 유저 정보 호출
  const { data: minihomeData } = useMinihomeData({ nickname });
  // console.log(minihomeData);

  //꾸미기 데이터 호출
  const { data: adornData } = useMinihomeAdorn({ nickname });
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
                width={960}
                height={480}
                {...{ fetchpriority: "high" }}
                decoding="async"
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
