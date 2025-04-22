import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useImage from "@hooks/useImage";

import style from "@styles/Gacha/GachaOpenCapsule.module.css";

function GachaOpenCapsule({
  color,
  imageUrl,
  onClick,
}: {
  color: string;
  imageUrl: string;
  onClick: () => void;
}) {
  const navigate = useNavigate();
  const image = useImage(imageUrl);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const handleClose = () => {
    onClick();
  };
  return (
    <main className={style.wrapper}>
      <img
        className={style.open_capsule}
        src={`/images/${color}OpenCapsule.webp`}
        alt="Open"
        ref={imgRef}
        width={400}
        height={400}
      />
      {image ? (
        <div className={style.result_open_capsule}>
          <img
            src={image}
            alt="item"
            ref={imgRef}
            width={240}
            height={240}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <section className={style.section}>
        <p onClick={() => navigate("/minihome/itembook")}>아이템 북으로 가기</p>
        <p onClick={handleClose}>닫기</p>
      </section>
    </main>
  );
}

export default GachaOpenCapsule;
