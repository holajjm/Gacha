import React from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Minihome/MinihomeItem.module.css";

function MiniHomeItem({
  imageUrl,
  positionX,
  positionY,
}: {
  imageUrl: string;
  positionX: number;
  positionY: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${positionY + 176}px`,
        left: `${positionX + 416}px`,
      }}
      className={style.container}
    >
      <img src={useImage(imageUrl)} alt="item" />
    </div>
  );
}

export default MiniHomeItem;
