import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useModalState } from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";
import useImage from "@hooks/useImage";
import usePageUpper from "@hooks/usePageUpper";
import Button from "@components/Button";
import { toast } from "react-toastify";

import style from "@styles/Layouts/modals/MarketSellingItemModal.module.css";
import { MySellingItemData } from "types/market";

function MarketSellingItemModal({
  filterArray,
  clickItemId,
}: {
  filterArray: MySellingItemData[] | undefined;
  clickItemId: number;
}) {
  usePageUpper();
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const divRef = useRef<HTMLDivElement>(null);
  const modalClose = useModalState((state) => state.modalClose);

  const data = filterArray?.find(
    (e: MySellingItemData) => e.productId === clickItemId,
  );
  // console.log(sellingItems);
  // console.log(data);

  const { mutate: sellCancel } = useMutation({
    mutationFn: async () => {
      if (confirm("판매를 취소하시겠습니까?")) {
        try {
          const response = await axios.delete(`/products/${clickItemId}`, {});
          toast("취소 되었습니다.");
          modalClose();
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        console.log(data?.error);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["SellingItems"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "Escape") {
      modalClose();
    }
  };
  return (
    <div
      onKeyDown={handleKeyPress}
      tabIndex={0}
      ref={divRef}
      className={style.container}
    >
      <main className={style.wrapper}>
        <p className={style.background}></p>
        <button onClick={modalClose} className={style.close_button}>
          X
        </button>
        <section className={style.section}>
          <aside className={style.section_aside}>
            <img src={useImage(data?.imageUrl as string)} alt="sample" />
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
                onClick={sellCancel}
              ></Button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketSellingItemModal;
