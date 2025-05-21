import React, { lazy, Suspense, useEffect, useRef } from "react";

import { useUserStore } from "@store/store";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import Loading from "@components/Loading";
import MainTitle from "./MainTitle";
import style from "@styles/Main/MainPage.module.css";

const MainMiniHomePreview = lazy(() => import("./MainMiniHomePreview"));
const MainExplorePreview = lazy(() => import("./MainExplorePreview"));
const MainGachaPreview = lazy(() => import("./MainGachaPreview"));
const MainMarketPreview = lazy(() => import("./MainMarketPreview"));

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
  // console.log("user", user);
  const getUserInfo = async () => {
    if (user?.accessToken) {
      const response = await fetch(`${SERVER_API}/userInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = await response.json();
      // console.log(data?.data);
      if (data?.data) {
        setUser({
          ...user,
          nickname: data?.data?.nickname,
          profileId: data?.data?.profileId,
        });
      } else if (data?.error) {
        console.log(data?.error);
      }
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
        <MainTitle
          article1Ref={article1Ref}
          article2Ref={article2Ref}
          article3Ref={article3Ref}
          article4Ref={article4Ref}
          article5Ref={article5Ref}
          scrollToSection={scrollToSection}
        />
        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <MainMiniHomePreview article2Ref={article2Ref} />
          <MainExplorePreview article3Ref={article3Ref} />
          <MainGachaPreview article4Ref={article4Ref} />
          <MainMarketPreview article5Ref={article5Ref} />
        </Suspense>
      </section>
    </div>
  );
}

export default MainPage;
