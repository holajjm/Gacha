import React, { useEffect, useState } from "react";

import { useCoinState, useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

import style from "@styles/Market/MarketItemModal.module.css";

interface ModalData {
  grade: string;
  imageUrl: string;
  name: string;
  stock: number;
  price: number;
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
    price: 0,
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

  // 재고가 없을 경우 구매 불가 예외 처리 로직 구현 요망
  const triggerRefresh = useCoinState((state) => state.triggerRefresh);
  const buyItem = async () => {
    if (confirm("구매하시겠습니까?")) {
      try {
        await fetch(`${SERVER_API}/items/${clickItemId}/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        alert("구매 성공");
        triggerRefresh();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

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
              <p>
                이름 <span>{modalData?.name}</span>
              </p>
              <p>
                등급 <span>{modalData?.grade}</span>
              </p>
              <p>
                가격 <span>{modalData?.price}</span>
              </p>
              <p>
                수량 <span>{modalData?.stock}</span>
              </p>
            </div>
            {/* 구매 기능 구현 및 공용 버튼 컴포넌트로 변경 */}
            <footer className={style.main_footer}>
              <Button text={"구매"} width={"5rem"} onClick={buyItem}></Button>
            </footer>
          </main>
        </section>
      </section>
    </div>
  );
}

export default MarketItemModal;
