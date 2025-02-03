import React, { useEffect, useState } from "react";
import style from "@styles/Market/MarketItemModal.module.css";
import { useUserStore } from "@store/store";

interface ModalData {
  grade: string;
  imageUrl: string;
  name: string;
  quantity: number;
}

function MarketItemModal({
  clickItemId,
  onClick,
}: {
  clickItemId: number;
  onClick: () => void;
}) {
  const [modalData, setModalData] = useState<ModalData>({
    grade: "",
    imageUrl: "",
    name: "",
    quantity: 0,
  });
  const { user } = useUserStore((state) => state);
  const getModalData = async () => {
    const response = await fetch(
      `https://222.121.46.20:80/items/${clickItemId}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setModalData(data);
  };
  useEffect(() => {
    getModalData();
  }, []);

  const [imageList, setImageList] = useState<string>();
  const image = async () => {
    const response = await fetch(
      `https://222.121.46.20:80${modalData?.imageUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/png, image/jif",
        },
      },
    );
    const blob = await response.blob();
    const imageObjUrl = URL.createObjectURL(blob);
    setImageList(imageObjUrl);
  };
  useEffect(() => {
    image();
  }, [modalData]);
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <button onClick={onClick} className={style.button}>
          X
        </button>
        <section className={style.contents}>
          <aside className={style.aside}>
            <img src={imageList} alt="sample" />
          </aside>
          <main className={style.main}>
            <p>이름 | {modalData?.name}</p>
            <p>등급 | {modalData?.grade}</p>
            <p>수량 | {modalData?.quantity}</p>
            <button>구매</button>
          </main>
        </section>
      </section>
    </div>
  );
}

export default MarketItemModal;
