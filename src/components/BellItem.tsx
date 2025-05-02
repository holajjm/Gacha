import React from "react";

import style from "@styles/Layouts/BellItems.module.css";

interface Notis {
  id: number;
  data: string;
  notificationType: string;
}

function BellItem({
  data,
  handleLotto,
}: {
  data: Notis;
  handleLotto: () => void;
}) {
  return (
    <article className={style.article}>
      {data?.notificationType === "lotto_issued" ? (
        <p onClick={handleLotto}>{data?.data}</p>
      ) : (
        <p>{data?.data}</p>
      )}
    </article>
  );
}

export default BellItem;
