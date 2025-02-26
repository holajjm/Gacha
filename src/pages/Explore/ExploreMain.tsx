import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";
import ExploreItem from "./ExploreItem";

import { SlArrowLeft } from "react-icons/sl";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import style from "@styles/Explore/ExploreMain.module.css";

interface ExploreItemData {
  profileImageStoreFileName: string;
  nickname: string;
  totalVisitorCnt: number;
}

function ExploreMain() {
  usePageTitle("둘러보기")
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [exploreList, setExploreList] = useState<ExploreItemData[]>([]);
  const [select, setSelect] = useState<string>("");
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
    console.log(data?.data);
    
    setExploreList((prevList) => [...prevList, ...(data?.data?.content || []) ]);
    setCurrentPage((prev) => prev + 1);
  };
  useEffect(() => {
    getUserList();
  }, []);
  
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

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

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
    }
  }, [select]);
  // 이중 배열 추후 수정, 상태값도 변경
  const userList = exploreList.map((e, i) => <ExploreItem key={i} data={e} />);

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <div className={style.header_wrapper}>
              <Button text={<SlArrowLeft />} width={"2.5rem"} onClick={() => window.history.back()}/>
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
            <div>Profile</div>
            <div>NickName</div>
            <div>Visitor</div>
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
