import React from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Minihome/Adorn/MinihomeAdornBackgroundItem.module.css";
import { BackgroundItemData } from "types/minihome";

function MinihomeAdornBackgroundItem({
  data,
  getBack,
}: {
  data: BackgroundItemData;
  getBack: (data: BackgroundItemData) => void;
}) {
  const handle = () => {
    getBack(data);
  };
  return (
    <div onClick={handle} className={style.item}>
      <img
        src={useImage(data?.imageUrl)}
        alt="background"
        {...{fetchpriority: "high"}}
        decoding="async"
        height={144}
      />
    </div>
  );
}

export default MinihomeAdornBackgroundItem;
