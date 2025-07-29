import React from "react";

import style from "@styles/Gacha/GachaCloseCapsule.module.css";

function GachaCloseCapsule({ color }: { color: string }) {
  return (
    <img
      className={style.close_capsule}
      src={`/images/${color}CloseCapsule.webp`}
      alt="Close"
      width={320}
      height={352}
      {...{ fetchpriority: "high" }}
      decoding="async"
    />
  );
}

export default GachaCloseCapsule;
