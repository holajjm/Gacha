import React, { useCallback, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Button from "@components/Button";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { useUserStore } from "@store/store";
import style from "@styles/Market/Enroll/MarketEnroll.module.css";

import MarketEnrollPreview from "./MarketEnrollPreview";
import MarketEnrollItem from "./MarketEnrollItem";
import { SlArrowLeft } from "react-icons/sl";
import type { Item } from "types/market";


function MarketEnrollItemList() {
  usePageTitle("마켓 - 판매 등록");
  usePageUpper();
  const user = useUserStore((state) => state.user);
  const axios = useCustomAxios();
  const [selectedItem, setSelectedItem] = useState<Item>({
    imageUrl: "",
    itemCnt: 0,
    itemGrade: "",
    itemId: 0,
    itemName: "",
    price: 0,
    stock: 0,
    userItemIds: [],
  });

  const [pageNum, setPageNum] = useState<number>(0);
  const getMyItemList = async ({ pageNum }: { pageNum: number }) => {
    const response = await axios.get(
      `/items/me?sort=createdAt,desc&page=${pageNum}&size=7`,
    );
    return response?.data;
  };

  const { data: enrollItemList } = useInfiniteQuery({
    queryKey: ["EnrollItemList", user, pageNum],
    queryFn: () => getMyItemList({ pageNum }),
    getNextPageParam: (lastPage) => {
      // console.log(lastPage);
      return lastPage;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
  // console.log(enrollItemList);

  const pageNumList = () => {
    const numList = [];
    for (let i = 0; i < enrollItemList?.pages[0]?.totalPages; i++) {
      numList.push(
        <li
          className={
            enrollItemList?.pages[enrollItemList?.pages.length - 1]?.pageable
              ?.pageNumber == i
              ? style.active_pageNum
              : style.pageNum
          }
          key={i}
          onClick={() => setPageNum(i)}
        >
          {i + 1}
        </li>,
      );
    }
    return numList;
  };

  const handleItemClick = useCallback((item: Item) => {
    setSelectedItem(item);
  }, []);

  const myItemList = enrollItemList?.pages[0]?.content.map((e: Item) => (
    <MarketEnrollItem key={e.itemId} item={e} onSelect={handleItemClick} />
  ));
  // console.log(myItemList);

  return (
    <div className={style.container}>
      <main className={style.main}>
        <header className={style.main_header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
          ></Button>
          <h1 className={style.main_header_title}>내 상품 등록</h1>
        </header>
        <section className={style.section}>
          <MarketEnrollPreview item={selectedItem} />
          <span className={style.section_wrapper}>
            <h1 className={style.section_title}>내 아이템</h1>
            {myItemList?.length === 0 ? (
              <p className={style.section_message}>
                보유중인 아이템이 없습니다.
              </p>
            ) : (
              <article className={style.section_article}>{myItemList}</article>
            )}
            <ul className={style.numberList}>{pageNumList()}</ul>
          </span>
        </section>
      </main>
    </div>
  );
}

export default MarketEnrollItemList;
