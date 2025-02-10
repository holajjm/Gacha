import React, { useEffect, useRef, useState } from "react";

import GachaOpenCapsule from "./GachaOpenCapsule";
import GachaCloseCapsule from "./GachaCloseCapsule";
import style from "@styles/Gacha/GachaCapsule.module.css";

interface GachaData {
  itemGrade: string;
  itemImageUrl: string;
  itemName: string;
}

function GachaCapsule({ imageData,onClick }: { imageData: GachaData,onClick:() => void }) {
  const [color, setColor] = useState<string>("");
  const [randomNum, setRandomNum] = useState<number>(0);
  const colorArr = ["Blue", "Pink", "Yellow", "Green"];
  const getRandomColor = () => {
    const num = Math.floor(Math.random() * 4);
    setRandomNum(num);
  };

  useEffect(() => {
    getRandomColor();
  }, []);

  useEffect(() => {
    setColor(colorArr[randomNum]);
  }, [randomNum]);

  const timerRef = useRef<number>(0);
  const [showComponent, setShowComponent] = useState("none");
  const openModal = () => {
    setShowComponent("Close");
    timerRef.current = setTimeout(() => {
      setShowComponent("Open");
    }, 2000);
  };
  useEffect(() => {
    openModal();
  }, []);
  const handleClose = () => {
    onClick()
  }
  return (
    <div className={style.container}>
      <div className={style.background}></div>
      <button onClick={handleClose} className={style.closeBTN}>X</button>
      <div className={style.wrapper}>
        {showComponent === "Open" && (
          <GachaOpenCapsule color={color} imageUrl={imageData?.itemImageUrl} />
        )}
        {showComponent === "Close" && <GachaCloseCapsule color={color} />}
      </div>
    </div>
  );
}

export default GachaCapsule;
