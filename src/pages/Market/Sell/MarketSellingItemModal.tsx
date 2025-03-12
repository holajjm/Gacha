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
      <main className={style.wrapper}>
        <p className={style.background}></p>
        <button onClick={onClick} className={style.close_button}>
          X
        </button>
        <section className={style.section}>
          <aside className={style.section_aside}>
            <img src={useImage(data?.imageUrl)} alt="sample" />
          </aside>
          <article className={style.section_article}>
            <aside className={style.section_article_aside}>
              <p>
                이름 <span>{data?.name}</span>
              </p>
              <p>
                등급 <span>{data?.grade}</span>
              </p>
              <p>
                판매상태 <span>{data?.status}</span>
              </p>
              {data?.status !== "판매 중" ? (
                <p>
                  거래일자 <span>{data?.transactionDate}</span>
                </p>
              ) : null}
            </aside>
            <div className={style.section_article_button}>
              <Button
                text={"판매 취소"}
                width={"5rem"}
                onClick={handleCancel}
              ></Button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketSellingItemModal;
