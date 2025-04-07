import React, { useEffect, useState } from "react";

import Lotto from "./Lotto";
import style from "@styles/Layouts/BellItems.module.css";

interface NotiDetailData {
  itemGrade?: string;
  itemName?: string;
  coin?: number;
}
interface Notis {
  id: number;
  type: string;
  data: NotiDetailData;
  read: boolean;
}
interface NotiData {
  count: number;
  hasNewNotifications: boolean;
  notifications: Notis[];
}

function BellItem({
  data,
  handleLotto,
}: {
  data: NotiDetailData;
  handleLotto: () => void;
}) {
  return (
    <article className={style.article}>
      {data?.itemGrade ? (
        <p onClick={handleLotto}>
          {data?.itemGrade}등급의 아이템을 모두 모아 복권이 지급되었습니다.
          여기를 눌러 복권 결과를 확인해보세요!
        </p>
      ) : (
        <p>
          마켓에 등록한 {data?.itemName}가 판매되어 {data?.coin} 코인이
          지급되었습니다.
        </p>
      )}
    </article>
  );
}

function BellItems({ data }: { data: NotiData }) {
  const [notis, setNotis] = useState<Notis[]>([]);
  useEffect(() => {
    setNotis(data?.notifications);
  }, [data]);
  const itemList = notis.map((e) => (
    <BellItem key={e?.id} data={e?.data} handleLotto={handleLotto} />
  ));

  const [lotto, setLotto] = useState(false);
  console.log(lotto);
  const handleLotto = () => {
    setLotto(true);
  };
  const closeLotto = () => {
    setLotto(false);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "Escape") {
      setLotto(false);
    }
  };
  return (
    <>
      {lotto ? (
        <Lotto closeLotto={closeLotto} onKeyPress={handleKeyPress} />
      ) : null}
      <section className={style.container}>
        {data?.count ? (
          itemList
        ) : (
          <span className={style.noItem}>알림이 없습니다.</span>
        )}
        {/* <p className={style.article}>
          마켓에 등록한 아이템이 판매되어 100 코인이 지급되었습니다.
        </p>
        <p className={style.article} onClick={handleLotto}>
          A등급의 아이템을 모두 모아 복권이 지급되었습니다. 여기를 눌러 복권
          결과를 확인해보세요!
        </p> */}
      </section>
    </>
  );
}

export default BellItems;
