import React, { useState } from "react";

import Lotto from "./Lotto";
import BellItem from "./BellItem";
import style from "@styles/Layouts/BellItems.module.css";

interface Notis {
  id: number;
  data: string;
  notificationType: string; //lotto_issued trade_completed
}
interface NotiData {
  count: number;
  notifications: Notis[];
}

function BellItems({ data }: { data: NotiData }) {
  console.log(data);

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
  const itemList = data?.notifications.map((e) => (
    <BellItem key={e?.id} data={e} handleLotto={handleLotto} />
  ));
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
      </section>
    </>
  );
}

export default BellItems;
