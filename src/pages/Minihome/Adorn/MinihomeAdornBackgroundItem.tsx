import React, { useEffect, useRef } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []); 
  const handle = () => {
    getBack(data);
  };
  return (
    <div onClick={handle} className={style.item}>
      <img src={useImage(data?.imageUrl)} alt="background" ref={imgRef} height={144}/>
    </div>
  );
}

export default MinihomeAdornBackgroundItem;
