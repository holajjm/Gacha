import React from "react";
import useImage from "@hooks/useImage";

import style from "@styles/Minihome/Adorn/MinihomeAdornBackgroundItem.module.css";

interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}

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
      <img src={useImage(data?.imageUrl)} alt="" />
    </div>
  );
}

export default MinihomeAdornBackgroundItem;
