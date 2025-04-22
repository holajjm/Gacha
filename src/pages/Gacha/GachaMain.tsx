import React, { useEffect, useRef, useState } from "react";
import { useCoinState, useUserStore } from "@store/store";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import Button from "@components/Button";

import GachaCapsule from "./GachaCapsule";
import style from "@styles/Gacha/GachaMain.module.css";

interface GachaData {
  itemGrade: string;
  itemImageUrl: string;
  itemName: string;
}

function GachaMain() {
  usePageTitle("Gacha Shop");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { coinRefresh } = useCoinState((state) => state);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const [open, setOpen] = useState<boolean>(false);
  const [gachaData, setGachaData] = useState<GachaData>({
    itemGrade: "",
    itemImageUrl: "",
    itemName: "",
  });
  const getGacha = async () => {
    try {
      const response = await fetch(`${SERVER_API}/gacha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = await response.text();
      setGachaData(JSON.parse(data)?.data);
      coinRefresh();
    } catch (error) {
      console.error(error);
    }
  };
  const handleGachaClick = () => {
    getGacha();
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>GACHA SHOP</h1>
          <p className={style.header_description}>랜덤 아이템을 뽑아봐요!</p>
        </header>
        <section className={style.section}>
          <div>
            <img
              src="/images/GachaSample.webp"
              alt="Gacha"
              ref={imgRef}
              width={320}
              height={320}
            />
          </div>
          <Button
            text={"아이템 뽑기"}
            width={"10rem"}
            onClick={handleGachaClick}
          ></Button>
        </section>
      </main>
      {open ? (
        <GachaCapsule imageData={gachaData} onClick={handleModalClose} />
      ) : null}
    </div>
  );
}

export default GachaMain;
