import React from "react";

import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";
import Button from "@components/Button";

import style from "@styles/Market/Sell/MarketSellingItemModal.module.css";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: string | null;
}

function MarketSellingItemModal({
  onClick,
  data,
}: {
  onClick: () => void;
  data: MySellingItemData;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const handleCancel = async () => {
    if (confirm("판매 취소 하시겠습니까?")) {
      try {
        await fetch(`${SERVER_API}/products/${data?.productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        alert("취소 되었습니다.");
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
            <img src={useImage(data?.imageUrl)} alt="sample" />
          </aside>
          <main className={style.main}>
            <p>이름 | {data?.name}</p>
            <p>등급 | {data?.grade}</p>
            <p>판매상태 | {data?.status}</p>
            {data?.status !== "판매 중" ? (
              <p>거래일자 | {data?.transactionDate}</p>
            ) : null}
            <div>
              <Button
                text={"판매 취소"}
                width={"5rem"}
                onClick={handleCancel}
              ></Button>
            </div>
          </main>
        </section>
      </section>
    </div>
  );
}

export default MarketSellingItemModal;
