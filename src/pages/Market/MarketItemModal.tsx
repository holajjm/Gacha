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
  const coinRefresh = useCoinState((state) => state.coinRefresh);
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
        coinRefresh();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <p className={style.background}></p>
        <button onClick={onClick} className={style.close_button}>
          X
        </button>
        <section className={style.section}>
          <aside className={style.section_aside}>
            <img src={useImage(modalData?.imageUrl)} alt="sample" />
          </aside>
          <article className={style.section_article}>
            <aside className={style.section_article_aside}>
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
            </aside>
            {/* 구매 기능 구현 및 공용 버튼 컴포넌트로 변경 */}
            <div className={style.section_article_button}>
              <Button text={"구매"} width={"5rem"} onClick={buyItem}></Button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketItemModal;
