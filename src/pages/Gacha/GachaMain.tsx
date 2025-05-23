import React, { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useModalState } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import Button from "@components/Button";

import GachaCapsule from "./GachaCapsule";
import style from "@styles/Gacha/GachaMain.module.css";

function GachaMain() {
  usePageTitle("가챠 뽑기");
  usePageUpper();
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const { modal, modalOpen } = useModalState((state) => state);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);

  const { data: gachaData, mutate: getGacha } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/gacha", {});
      return response?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coin"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleGachaClick = () => {
    getGacha();
    modalOpen();
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
              src="/images/GachaMain.webp"
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
      {modal ? <GachaCapsule itemImageUrl={gachaData?.itemImageUrl} /> : null}
    </div>
  );
}

export default GachaMain;
