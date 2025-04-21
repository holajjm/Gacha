import React, { useEffect, useRef } from "react";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import MainTitle from "./MainTitle";
import MainMiniHomePreview from "./MainMiniHomePreview";
import MainExplorePreview from "./MainExplorePreview";
import MainGachaPreview from "./MainGachaPreview";
import MainMarketPreview from "./MainMarketPreview";
import style from "@styles/Main/MainPage.module.css";

import { useUserStore } from "@store/store";

function MainPage() {
  usePageTitle("GachaGacha");
  usePageUpper();

  const article1Ref = useRef<HTMLDivElement>(null);
  const article2Ref = useRef<HTMLDivElement>(null);
  const article3Ref = useRef<HTMLDivElement>(null);
  const article4Ref = useRef<HTMLDivElement>(null);
  const article5Ref = useRef<HTMLDivElement>(null);
  // 각 섹션으로 스크롤하는 함수
  const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth" });
  };

  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user, setUser } = useUserStore((state) => state);
  console.log("user", user);
  const getUserInfo = async () => {
    const response = await fetch(`${SERVER_API}/user_info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data?.data);
    if (data?.data) {
      setUser({
        ...user,
        nickname: data?.data?.nickname,
        profileId: data?.data?.profileId,
      });
    } else if (data?.error) {
      console.log(data?.error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <ul>
          <li onClick={() => scrollToSection(article1Ref)}></li>
          <li onClick={() => scrollToSection(article2Ref)}></li>
          <li onClick={() => scrollToSection(article3Ref)}></li>
          <li onClick={() => scrollToSection(article4Ref)}></li>
          <li onClick={() => scrollToSection(article5Ref)}></li>
        </ul>
      </nav>
      <section className={style.wrapper}>
        <MainTitle article1Ref={article1Ref} />
        <MainMiniHomePreview article2Ref={article2Ref} />
        <MainExplorePreview article3Ref={article3Ref} />
        <MainGachaPreview article4Ref={article4Ref} />
        <MainMarketPreview article5Ref={article5Ref} />
      </section>
    </div>
  );
}

export default MainPage;
