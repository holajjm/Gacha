import React from "react";

import { useLottoModalState } from "@store/store";

import style from "@styles/Layouts/BellItems.module.css";
import { Notis } from "types/component";


function BellItem({ data }: { data: Notis }) {
  console.log(data);
  const modalOpen = useLottoModalState((state) => state.modalOpen);

  return (
    <article className={style.article}>
      {data?.notificationType === "lotto_issued" ? (
        <p onClick={modalOpen}>{data?.data}</p>
      ) : (
        <p>{data?.data}</p>
      )}
    </article>
  );
}

export default BellItem;
