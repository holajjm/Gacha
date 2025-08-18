import React, { useEffect, useState } from "react";

import { ENV } from "@constants/env";
import MinihomeAdornItemSkeleton from "@components/skeleton/MinihomeAdornItemSkeleton";
import { useUserStore } from "@store/store";
import style from "@styles/Minihome/Adorn/MinihomeAdornItemList.module.css";

import MinihomeAdornItem from "./MinihomeAdornItem";
import type { AdornItemData } from "types/minihome";


function MinihomeAdornItemList({
  getItem,
}: {
  getItem: (data: AdornItemData) => void;
}) {
  const user = useUserStore((state) => state.user);
  const [itemList, setItemList] = useState<AdornItemData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageParams, setPageParams] = useState<boolean>(false);

  const getItems = async () => {
    if (pageParams) return;
    const response = await fetch(
      `${ENV.SERVER_API}/items/${user?.nickname}?page=${page}&size=7&sort=createdAt,desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    // console.log(data?.data);
    // console.log(data?.data?.content);
    if (data?.data?.content) {
      setItemList((prev) => [...prev, ...data.data.content]);
    }
    if (data?.data?.last) {
      setPageParams(data?.data?.last);
    }
  };
  useEffect(() => {
    getItems();
  }, [page]);
  // console.log("page", page);
  // console.log("pageParams", pageParams);
  // console.log("itemList", itemList);

  const handleClickItem = (data: AdornItemData) => {
    getItem(data);
  };
  const items = itemList.map((e) => (
    <MinihomeAdornItem key={e.subId} data={e} onClick={handleClickItem} />
  ));

  // const obsRef = useRef<HTMLParagraphElement | null>(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entry) => {
  //     const first = entry[0];
  //     if (first.isIntersecting && !pageParams) {
  //       console.log("🔽 Intersecting. Loading next page...");
  //       setPage((prev) => prev + 1);
  //     } else {
  //       console.log("False");
  //     }
  //   });
  //   const target = obsRef.current;
  //   if (target) {
  //     observer.observe(target);
  //   }
  //   return () => {
  //     if (target) {
  //       observer.unobserve(target);
  //     }
  //   };
  // }, [pageParams]);
  const moreData = () => {
    if (pageParams) return;
    setPage(page + 1);
  };
  return (
    <>
      {itemList.length ? (
        <section className={style.main}>
          {items}
          {/* <p ref={obsRef}>Load More</p> */}
          {!pageParams ? <button className={style.loadBtn} onClick={moreData}>
            더보기...
          </button> : null}
        </section>
      ) : (
        <MinihomeAdornItemSkeleton />
      )}
    </>
  );
}

export default MinihomeAdornItemList;
