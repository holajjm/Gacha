import React from "react";
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
  const handleClose = () => {
    onClick();
  };
  return (
    <main className={style.wrapper}>
      <img
        className={style.open_capsule}
        src={`src/assets/images/${color}OpenCapsule.svg`}
        alt="Open"
      />
      {image ? (
        <div className={style.result_open_capsule}>
          <img src={image} alt="item" />
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
