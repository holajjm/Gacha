import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/store";
import ExploreItem from "./ExploreItem";

import style from "@styles/Explore/ExploreMain.module.css";

interface ExploreItemData {
  imageUrl: string;
  nickname: string;
  totalVisitorCnt: number;
}

function ExploreMain() {
  const { user } = useUserStore((state) => state);
  const [exporeList, setExploreList] = useState<ExploreItemData[]>([]);
  const [select, setSelect] = useState<string>("");
  const getUserList = async () => {
    const response = await fetch("https://222.121.46.20:80/explore/minihome", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setExploreList(data?.content);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    if (select === "createdAt") {
      const sortByCreatedAr = async () => {
        const response = await fetch(
          "https://222.121.46.20:80/explore/minihome?sort=createdAt,desc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setExploreList(data?.content);
      };
      sortByCreatedAr();
    } else if (select === "totalVisitorCnt") {
      const sortByTotalVisitorCnt = async () => {
        const response = await fetch(
          "https://222.121.46.20:80/explore/minihome?sort=totalVisitorCnt,desc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setExploreList(data?.content);
      };
      sortByTotalVisitorCnt();
    }
  }, [select]);
  const userList = exporeList.map((e, i) => <ExploreItem key={i} data={e} />);

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
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
