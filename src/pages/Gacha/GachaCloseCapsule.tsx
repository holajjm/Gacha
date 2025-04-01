import React from "react";

import style from "@styles/Gacha/GachaCloseCapsule.module.css";

function GachaCloseCapsule({ color }: { color: string }) {
  return (
    <img
      className={style.close_capsule}
      src={`/images/${color}CloseCapsule.svg`}
      alt="Close"
    />
  );
}

export default GachaCloseCapsule;