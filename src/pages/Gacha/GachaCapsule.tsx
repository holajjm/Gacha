import React, { useEffect, useRef, useState } from "react";

import style from "@styles/Gacha/GachaCapsule.module.css";

import GachaOpenCapsule from "./GachaOpenCapsule";
import GachaCloseCapsule from "./GachaCloseCapsule";

function GachaCapsule({ itemImageUrl }: { itemImageUrl: string }) {
  const [randomNum, setRandomNum] = useState<number>(0);
  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 4));
  }, []);

  const timerRef = useRef<number>(0);
  const [showComponent, setShowComponent] = useState<string>("none");
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
        {showComponent === "Close" ? (
          <GachaCloseCapsule
            color={["Blue", "Pink", "Yellow", "Green"][randomNum]}
          />
        ) : (
          <GachaOpenCapsule
            color={["Blue", "Pink", "Yellow", "Green"][randomNum]}
            itemImageUrl={itemImageUrl}
          />
        )}
      </main>
    </div>
  );
}

export default GachaCapsule;
