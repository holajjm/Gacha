import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import useCustomAxios from "@hooks/useCustomAxios";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MarketMySellingItem from "./MarketMySellingItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Market/Sell/MarketMySellingList.module.css";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMyList() {
  usePageTitle("Market - MySelling");
  usePageUpper();
  const axios = useCustomAxios();
  const { user } = useUserStore((state) => state);
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<string>("latest");
  const [navClick, setNavClick] = useState<string>("");
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setNavClick((e.target as HTMLElement).getAttribute("datatype") as string);
  };
  const sort = selected === "latest" ? "desc" : "asc";
  const grade = navClick ? `?grade=${navClick}&` : "?";

  const getSellingItems = async ({ page = 0 }: { page: number }) => {
    const response = await axios.get(
      `/products/me${grade}sort=createdAt,${sort}&page=${page}&size=10`,
    );
    return response?.data;
  };

  const { data: sellingItems, fetchNextPage } = useInfiniteQuery({
    queryKey: ["SellingItems", grade, sort, user],
    queryFn: ({ pageParam = 0 }) => getSellingItems({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      // console.log("lastPage", lastPage);
      const currentPage = lastPage?.pageable?.pageNumber;
      return inView ? currentPage + 1 : currentPage;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  
  const filterArray = sellingItems?.pages.map((e) => e.content).flat();
  const sellingItemList = filterArray?.map((e: MySellingItemData) => (
    <MarketMySellingItem key={e.productId} data={e} />
  ));
  // console.log(sellingItems);
  // console.log(filterArray);

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_wrapper}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            ></Button>
            <h1 className={style.header_title}>내 판매 목록</h1>
          </aside>
          <select onChange={handleSort} className={style.header_filter}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </header>
        <section className={style.section}>
          <nav onClick={handleClick} className={style.section_nav}>
            <button
              datatype=""
              className={navClick === "" ? style.active_button : style.button}
            >
              All
            </button>
            <button
              datatype="S"
              className={navClick === "S" ? style.active_button : style.button}
            >
              S등급
            </button>
            <button
              datatype="A"
              className={navClick === "A" ? style.active_button : style.button}
            >
              A등급
            </button>
            <button
              datatype="B"
              className={navClick === "B" ? style.active_button : style.button}
            >
              B등급
            </button>
            <button
              datatype="C"
              className={navClick === "C" ? style.active_button : style.button}
            >
              C등급
            </button>
            <button
              datatype="D"
              className={navClick === "D" ? style.active_button : style.button}
            >
              D등급
            </button>
          </nav>
          <article className={style.article}>
            <aside className={style.article_aside}>
              <p className={style.article_aside_background}></p>
              <p>아이템</p>
              <p>이름</p>
              <p>등급</p>
              <p>가격</p>
              <p>판매 상태</p>
              <p></p>
            </aside>
            <section className={style.article_section}>
              {sellingItemList}
              {filterArray && !sellingItems?.pages[sellingItems?.pages.length-1]?.last ? (
                <p ref={ref} className={style.article_section_text}>
                  더보기
                </p>
              ) : null}
            </section>
          </article>
        </section>
      </main>
    </div>
  );
}

export default MarketMyList;
