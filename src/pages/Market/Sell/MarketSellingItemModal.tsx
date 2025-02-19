import React, { useEffect, useState } from "react";
import style from "@styles/Market/Sell/MarketSellingItemModal.module.css";
import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: string | null;
}

function MarketSellingItemModal({ clickedItemId,onClick }: { clickedItemId:number,onClick: () => void }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const [modalData, setModalData] = useState<MySellingItemData[]>([]);
  const { user } = useUserStore((state) => state);
  const getModalData = async () => {
    const response = await fetch(`${SERVER_API}/products/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setModalData(data?.content);
  };
  useEffect(() => {
    getModalData();
  }, []);

  // const [imageList, setImageList] = useState<string>();
  // const image = async () => {
  //   if(modalData[clickedItemId-1]){
  //     const response = await fetch(
  //       `${SERVER_API}${modalData[clickedItemId-1]?.imageUrl}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "image/png, image/jif",
  //         },
  //       },
  //     );
  //     const blob = await response.blob();
  //     const imageObjUrl = URL.createObjectURL(blob);
  //     setImageList(imageObjUrl);
  //   }
  // };
  // useEffect(() => {
  //   image();
  // }, [modalData]);
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <button onClick={onClick} className={style.button}>
          X
        </button>
        <section className={style.contents}>
          <aside className={style.aside}>
            <img src={useImage(modalData[clickedItemId-1]?.imageUrl)} alt="sample" />
          </aside>
          <main className={style.main}>
            <p>이름 | {modalData[clickedItemId-1]?.name}</p>
            <p>등급 | {modalData[clickedItemId-1]?.grade}</p>
            <p>판매상태 | {modalData[clickedItemId-1]?.status}</p>
            {modalData[clickedItemId-1]?.status !== "판매 중" ? (
              <p>거래일자 | {modalData[clickedItemId-1]?.transactionDate}</p>
            ) : null}
            <button>판매 취소</button>
          </main>
        </section>
      </section>
    </div>
  );
}

export default MarketSellingItemModal;
