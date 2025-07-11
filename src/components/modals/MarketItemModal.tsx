import React, { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useModalState, useUserStore } from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";
import useImage from "@hooks/useImage";
import Button from "@components/Button";
import { toast } from "react-toastify";

import style from "@styles/Layouts/modals/MarketItemModal.module.css";

function MarketItemModal({
  clickItemId,
  onKeyPress,
}: {
  clickItemId: number;
  onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const { user } = useUserStore((state) => state);
  const { modalClose } = useModalState((state) => state);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.focus();
  }, []);
  const getModalData = async () => {
    const response = await axios.get(`/items/${clickItemId}/products`);
    return response;
  };
  const { data } = useQuery({
    queryKey: ["MarketModal", clickItemId, user],
    queryFn: getModalData,
    throwOnError: true,
    select: (data) => data?.data,
  });
  // console.log(data);

  const { mutate: buyItem } = useMutation({
    mutationFn: async () => {
      if (confirm(`${data?.name}을 구매하시겠습니까?`)) {
        try {
          const response = await axios.post(
            `/items/${clickItemId}/purchase`,
            {},
          );
          toast("구매 성공!");
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        console.log(data?.error?.message);
      }
      queryClient.invalidateQueries({ queryKey: ["coin"] });
      queryClient.invalidateQueries({ queryKey: ["MarketItem"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div
      onKeyDown={onKeyPress}
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
                가격 <span>{data?.price}</span>
              </p>
              <p>
                수량 <span>{data?.stock}</span>
              </p>
            </aside>
            <div className={style.section_article_button}>
              {data?.stock === 0 ? null : (
                <Button text={"구매"} width={"5rem"} onClick={buyItem}></Button>
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketItemModal;
