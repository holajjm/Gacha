import React, { useEffect, useState } from "react";
import style from "@styles/Market/MarketItemModal.module.css";
import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";

interface ModalData {
  grade: string;
  imageUrl: string;
  name: string;
  stock: number;
}

function MarketItemModal({
  clickItemId,
  onClick,
}: {
  clickItemId: number;
  onClick: () => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const [modalData, setModalData] = useState<ModalData>({
    grade: "",
    imageUrl: "",
    name: "",
    stock: 0,
  });
  const { user } = useUserStore((state) => state);
  const getModalData = async () => {
    const response = await fetch(
      `${SERVER_API}/items/${clickItemId}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    console.log(data?.data);
    
    setModalData(data?.data);
  };
  useEffect(() => {
    getModalData();
  }, []);

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <div className={style.background}></div>
        <button onClick={onClick} className={style.button}>
          X
        </button>
        <section className={style.contents}>
          <aside className={style.aside}>
            <img src={useImage(modalData?.imageUrl)} alt="sample" />
          </aside>
          <main className={style.main}>
            <div className={style.main_wrapper}>
              <p>이름 <span>{modalData?.name}</span></p>
              <p>등급 <span>{modalData?.grade}</span></p>
              <p>수량 <span>{modalData?.stock}</span></p>
            </div>
            {/* 구매 기능 구현 및 공용 버튼 컴포넌트로 변경 */}
            <button className={style.main_button}>구매</button>
          </main>
        </section>
      </section>
    </div>
  );
}

export default MarketItemModal;
