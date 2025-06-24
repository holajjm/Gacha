import React, { lazy, Suspense, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
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
  usePageTitle("Welcome to 가챠가챠!");
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

  const { user, setUser } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const getUser = async () => {
    const response = await axios.get("/userInfo");
    return response?.data;
  };
  const { data } = useQuery({
    queryKey: ["User", user],
    queryFn: getUser,
  });
  // console.log("user", user);
  // console.log(data);

  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        nickname: data?.nickname,
        profileId: data?.profileId,
      });
    }
    return
  }, [data]);

  // useEffect(() => {
  //   sessionStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

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
