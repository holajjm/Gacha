import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import useImage from "@hooks/useImage";
import Button from "@components/Button";
import { toast } from "react-toastify";

import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";
import { Item } from "types/market";


function MarketEnrollPreview({ item }: { item: Item }) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const { mutate: enrollItem } = useMutation({
    mutationFn: async () => {
      if (confirm("상품을 판매하시겠습니까?")) {
        try {
          const response = await axios.post("/products", {
            userItemId: item?.userItemIds[0],
          });
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        console.log(data?.error?.message);
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["EnrollItemList"] });
      queryClient.invalidateQueries({ queryKey: ["SellingItems"] });
      queryClient.invalidateQueries({ queryKey: ["MarketItem"] });
      toast("상품이 등록되었습니다!");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const imageTag = (
    <img
      src={useImage(item?.imageUrl)}
      alt={item?.itemName || "previewImage"}
    />
  );
  // console.log(item);

  return (
    <section className={style.section}>
      <span className={style.background}></span>
      {item?.imageUrl ? (
        <>
          <header className={style.section_header}>{imageTag}</header>
          <article className={style.section_article}>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>등급</th>
                  <th>가격</th>
                  <th>재고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item?.itemName}</td>
                  <td>{item?.itemGrade}</td>
                  <td>{item?.price}코인</td>
                  <td>{item?.stock}개</td>
                </tr>
              </tbody>
            </table>
            <span className={style.section_article_button}>
              <Button
                text={"판매 등록"}
                width={"6rem"}
                onClick={enrollItem}
              ></Button>
            </span>
          </article>
        </>
      ) : (
        <div className={style.section_no_contents}>
          <p className={style.section_no_text}>
            판매하실 아이템을 선택해주세요.
          </p>
        </div>
      )}
    </section>
  );
}

export default MarketEnrollPreview;
