import React, { useEffect, useState } from "react";

import { useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import ExploreItem from "./ExploreItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Explore/ExploreMain.module.css";

interface ExploreItemData {
  profileImageStoreFileName: string;
  nickname: string;
  totalVisitorCnt: number;
}

function ExploreMain() {
  usePageTitle("둘러보기");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [exploreList, setExploreList] = useState<ExploreItemData[]>([]);
  const [select, setSelect] = useState<string>("");

  // Mount 시 사용자 리스트 최초 호출
  const getUserList = async () => {
    const response = await fetch(
      `${SERVER_API}/explore/minihome?sort=createdAt,desc&page=${currentPage}&size=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setExploreList((prevList) => [...prevList, ...(data?.data?.content || [])]);
    setCurrentPage((prev) => prev + 1);
  };
  useEffect(() => {
    getUserList();
  }, []);

  // 무한 스크롤 구현
  const [currentPage, setCurrentPage] = useState<number>(0);
  const handleScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    if (exploreList.length > 0 && scrollTop + clientHeight >= scrollHeight)
      getUserList();
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [exploreList]);

  // 정렬 방식 선택 로직
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  // 정렬 방식에 따른 정렬된 데이터 재호출
  useEffect(() => {
    if (select === "createdAt") {
      const sortByCreatedAr = async () => {
        const response = await fetch(
          `${SERVER_API}/explore/minihome?sort=createdAt,desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setExploreList(data?.data?.content);
      };
      sortByCreatedAr();
    } else if (select === "totalVisitorCnt") {
      const sortByTotalVisitorCnt = async () => {
        const response = await fetch(
          `${SERVER_API}/explore/minihome?sort=totalVisitorCnt,desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setExploreList(data?.data?.content);
      };
      sortByTotalVisitorCnt();
    } else if (select === "score") {
      const sortByScore = async () => {
        const response = await fetch(
          `${SERVER_API}/explore/minihome/score?sort=score,desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setExploreList(data?.data?.content);
      };
      sortByScore();
    }
  }, [select]);

  const userList = exploreList.map((e, i) => <ExploreItem key={i} data={e} />);

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <div className={style.header_wrapper}>
              <Button
                text={<SlArrowLeft />}
                width={"2.5rem"}
                onClick={() => window.history.back()}
              />
              <h1 className={style.header_title}>둘러보기</h1>
            </div>
            <select onChange={onSelect} name="select" id="select">
              <option value="createdAt">가입순</option>
              <option value="totalVisitorCnt">인기순</option>
              <option value="score">스코어순</option>
            </select>
          </aside>
          <main className={style.header_main}>
            <div className={style.header_background}></div>
            <div>프로필</div>
            <div>닉네임</div>
            <div>방문자 수</div>
            <div></div>
          </main>
        </header>
        <main className={style.main}>
          <ul className={style.main_upperlist}>{userList}</ul>
        </main>
      </section>
    </div>
  );
}

export default ExploreMain;
