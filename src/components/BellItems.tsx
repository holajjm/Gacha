import React from "react";

import { useLottoModalState } from "@store/store";

import Lotto from "./Lotto";
import BellItem from "./BellItem";
import style from "@styles/Layouts/BellItems.module.css";

interface Notis {
  id: number;
  data: string;
  notificationType: string;
}
interface NotiData {
  count: number;
  notifications: Notis[];
}

function BellItems({ data }: { data: NotiData }) {
  console.log(data);
  const { modal, modalClose } = useLottoModalState((state) => state);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "Escape") {
      modalClose();
    }
  };
  const itemList = data?.notifications.map((e) => (
    <BellItem key={e?.id} data={e} />
  ));
  return (
    <>
      {modal && <Lotto onKeyPress={handleKeyPress} />}
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
