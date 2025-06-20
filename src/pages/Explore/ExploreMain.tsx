import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import ExploreItem from "./ExploreItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Explore/ExploreMain.module.css";

interface ExploreItemData {
  profileId: number;
  nickname: string;
  totalVisitorCnt: number;
  likeCount: number;
}
interface ParamData {
  createdAt?: string;
  totalVisitorCnt: string;
  score?: string;
  likeCount?: string;
  minihomeId?: number;
  userId?: number;
}
function ExploreMain() {
  usePageTitle("둘러보기");
  usePageUpper();
  const { user } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const { ref, inView } = useInView();

  const [paramData, setParamData] = useState<ParamData>({
    createdAt: "",
    totalVisitorCnt: "",
    score: "",
    likeCount: "",
    minihomeId: 0,
    userId: 0,
  });

  const [page, setPage] = useState<number>(0);
  const [select, setSelect] = useState<string>("createdAt");
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  const getUser = async ({
    page,
    select,
  }: {
    page: number;
    select: string;
  }) => {
    const baseURL = {
      createdAt: `/explore/minihome/${select}?${select}=${paramData?.createdAt}&minihomeId=${paramData?.minihomeId ? paramData?.minihomeId : ""}&sort=${select},desc&page=${page}&size=7`,
      totalVisitorCnt: `/explore/minihome/${select}?${select}=${paramData?.totalVisitorCnt ? paramData?.totalVisitorCnt : ""}&minihomeId=${paramData?.minihomeId ? paramData?.minihomeId : ""}&sort=${select},desc&page=${page}&size=7`,
      score: `/explore/minihome/${select}?score=${paramData?.score ? paramData?.score : ""}&userId=${paramData?.userId ? paramData?.userId : ""}&sort=${select},desc&page=${page}&size=7`,
      likeCount: `/explore/minihome/${select}?likeCount=${paramData?.likeCount ? paramData?.likeCount : ""}&minihomeId=${paramData?.minihomeId ? paramData?.minihomeId : ""}&sort=${select},desc&page=${page}&size=7`,
    }[select];
    const response = await axios.get(`${baseURL}`);
    console.log(baseURL);
    return response?.data;
  };
  
  console.log(select);
  console.log(paramData);

  const { data: exploreList, fetchNextPage } = useInfiniteQuery({
    queryKey: ["UserList", user, select],
    queryFn: () => getUser({ page, select }),
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });

  useEffect(() => {
    const length = exploreList && exploreList?.pages?.length - 1;
    console.log(length);
    if (length && length >= 7) {
      setParamData(exploreList?.pages[0]?.content[length]);
    }
  }, [exploreList?.pages[0]?.content]);

  const filterUserList = exploreList?.pages.map((e) => e.content).flat();
  const userList = filterUserList?.map((e: ExploreItemData, i: number) => (
    <ExploreItem key={i} data={e} />
  ));
  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      fetchNextPage();
    }
  }, [inView]);
  console.log("exploreList", exploreList);
  console.log("filterUserList", filterUserList);

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
              {filterUserList &&
              !exploreList?.pages[exploreList?.pages.length - 1]?.last ? (
                <p ref={ref} className={style.article_text}>
                  더보기
                </p>
              ) : null}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

export default ExploreMain;
