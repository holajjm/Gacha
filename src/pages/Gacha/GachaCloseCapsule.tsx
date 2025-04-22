import React, { useEffect, useRef } from "react";

import style from "@styles/Gacha/GachaCloseCapsule.module.css";

function GachaCloseCapsule({ color }: { color: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  return (
    <img
      className={style.close_capsule}
      src={`/images/${color}CloseCapsule.svg`}
      alt="Close"
      ref={imgRef}
      width={320}
      height={320}
    />
  );
}

export default GachaCloseCapsule;
