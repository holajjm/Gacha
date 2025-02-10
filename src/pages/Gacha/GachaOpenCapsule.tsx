import React, { useEffect, useState } from "react";

import style from "@styles/Gacha/GachaOpenCapsule.module.css";

function GachaOpenCapsule({
  color,
  imageUrl,
}: {
  color: string;
  imageUrl: string;
}) {
  const [imageList, setImageList] = useState<string>();
  const image = async () => {
    const response = await fetch(`https://222.121.46.20:80${imageUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "image/png, image/jif",
      },
    });
    const blob = await response.blob();
    const imageObjUrl = URL.createObjectURL(blob);
    setImageList(imageObjUrl);
  };
  useEffect(() => {
    image();
  }, [imageUrl]);
  return (
    <>
      <img
        className={`${style.open_capsule} ${style.open_capsule_opacity}`}
        src={`/images/${color}OpenCapsule.svg`}
        alt="Open"
      />
      {imageList ? (
        <div className={style.result_capsule}>
          <img src={imageList} alt="item" />
        </div>
      ) : null}
    </>
  );
}

export default GachaOpenCapsule;
