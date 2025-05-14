import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import useCustomAxios from "@hooks/useCustomAxios";

import ExploreItem from "./ExploreItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Explore/ExploreMain.module.css";

interface ExploreItemData {
  profileId: number;
  nickname: string;
  totalVisitorCnt: number;
  likeCount: number;
}

function ExploreMain() {
  usePageTitle("둘러보기");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const [select, setSelect] = useState<string>("createdAt");

  // 정렬 방식 선택 로직
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  // Mount 시 사용자 리스트 최초 호출
  const getUser = async ({
    page,
    select,
  }: {
    page: number;
    select: string;
  }) => {
    const baseURL = {
      createdAt: "/explore/minihome",
      totalVisitorCnt: "/explore/minihome",
      score: "/explore/minihome/score",
      likeCount: "/explore/minihome/like_count",
    }[select];
    const response = await axios.get(
      `${SERVER_API}${baseURL}?sort=${select},desc&page=${page}&size=6`,
    );
    return response?.data;
  };

  // 무한 스크롤 + 정렬 방식에 따른 정렬된 데이터 재호출
  const { data: exploreList } = useInfiniteQuery({
    queryKey: ["UserList", user, select],
    queryFn: ({ pageParam = 0 }) => getUser({ page: pageParam, select }),
    getNextPageParam: (lastPage) => {
      // console.log(lastPage);
      const currentPage = lastPage?.pageable?.pageNumber;
      const isLast = lastPage?.last;
      return !isLast ? currentPage + 1 : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
  // console.log(exploreList);

  // 유저 리스트 하위 컴포넌트 렌더링
  const userList = exploreList?.pages[0]?.content.map(
    (e: ExploreItemData, i: number) => <ExploreItem key={i} data={e} />,
  );

  // 페이지 리스트 헨더링
  const lastPage = Math.ceil(
    exploreList?.pages[0]?.numberOfElements / exploreList?.pages[0]?.size,
  );
  const pageList = [];
  for (let i = 1; i <= lastPage; i++) {
    pageList.push(i);
  }
  const currentPage = exploreList?.pages[0]?.pageable?.pageNumber + 1;

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            />
            <h1 className={style.header_title}>둘러보기</h1>
          </aside>
          <form className={style.header_select_wrapper} aria-label="정렬 선택">
            <label htmlFor="select">정렬 기준 선택</label>
            <select
              className={style.header_select}
              onChange={onSelect}
              name="select"
              id="select"
            >
              <option value="createdAt">가입순</option>
              <option value="totalVisitorCnt">인기순</option>
              <option value="score">스코어순</option>
              <option value="likeCount">좋아요순</option>
            </select>
          </form>
        </header>

        <section className={style.section}>
          <header className={style.section_header} aria-label="리스트 헤더">
            <p
              className={style.section_header_background}
              aria-hidden="true"
            ></p>
            <span>프로필</span>
            <span>닉네임</span>
            <span>방문자 수</span>
            <span aria-hidden="true"></span>
          </header>
          <article className={style.article}>
            <ul className={style.article_upperlist} aria-label="사용자 리스트">
              {userList}
            </ul>
            {exploreList?.pages[0]?.last ? (
              <nav
                className={style.article_listnav}
                aria-label="페이지 네비게이션"
              >
                <ul className={style.article_pagelist}>
                  {pageList.map((e) => (
                    <li
                      className={
                        currentPage === e
                          ? style.article_activePage
                          : style.article_page
                      }
                      key={e}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </article>
        </section>
      </main>
    </div>
  );
}

export default ExploreMain;
