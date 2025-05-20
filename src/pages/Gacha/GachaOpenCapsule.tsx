import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useModalState } from "@store/store";
import useImage from "@hooks/useImage";

import style from "@styles/Gacha/GachaOpenCapsule.module.css";

function GachaOpenCapsule({
  color,
  itemImageUrl,
}: {
  color: string;
  itemImageUrl: string;
}) {
  const navigate = useNavigate();
  const { modalClose } = useModalState((state) => state);
  const image = useImage(itemImageUrl);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);

  return (
    <main className={style.wrapper}>
      <img
        className={style.open_capsule}
        src={`/images/${color}OpenCapsule.webp`}
        alt="Open"
        ref={imgRef}
        width={320}
        height={448}
      />
      {image ? (
        <div className={style.result_open_capsule}>
          <img src={image} alt="item" ref={imgRef} width={240} height={240} />
        </div>
      ) : null}
      <section className={style.section}>
        <p onClick={() => navigate("/minihome/itembook")}>아이템 북으로 가기</p>
        <p onClick={modalClose}>닫기</p>
      </section>
    </main>
  );
}

export default GachaOpenCapsule;
