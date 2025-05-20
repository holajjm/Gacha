import React, { useEffect, useRef, useState } from "react";

import GachaOpenCapsule from "./GachaOpenCapsule";
import GachaCloseCapsule from "./GachaCloseCapsule";
import style from "@styles/Gacha/GachaCapsule.module.css";

function GachaCapsule({ itemImageUrl }: { itemImageUrl: string }) {
  const [color, setColor] = useState<string>("");
  const [randomNum, setRandomNum] = useState<number>(0);
  const colorArr = ["Blue", "Pink", "Yellow", "Green"];

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 4));
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

  return (
    <div className={style.container}>
      <p className={style.background}></p>
      <main className={style.wrapper}>
        {showComponent === "Open" && (
          <GachaOpenCapsule color={color} itemImageUrl={itemImageUrl} />
        )}
        {showComponent === "Close" && <GachaCloseCapsule color={color} />}
      </main>
    </div>
  );
}

export default GachaCapsule;
