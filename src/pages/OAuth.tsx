import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTokenStore, useUserStore } from "@store/store";
import style from "@styles/OAuth.module.css";

import { toast } from "react-toastify";
import type { QueryParams } from "types/user";

// 1.기존에는 토큰에 유저 정보를 담아서 주었기에 jwtDecode(jwt-decode) 라이브러리를 통해서 복호화를 거쳐 로그인 처리를 하였지만
// 쿼리 스트링으로 전달 받아 처리하는 것으로 수정함
// 2. OAuth.tsx 파일은 소셜 로그인 과정에서 유저 정보를 확인하고 메인 화면으로 이동 시켜주는 파일로 로그인과 메인 화면 중간에 페이지를 보유하면서 위치하고 있다.
function OAuth() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleData = () => {
    try {
      // 카카오 로그인 유저 정보 쿼리 스트링으로 가져옴
      const data = window.location.search;
      // 쿼리 스트링 값 객체로 변환하는 함수
      const parseQueryString = (data: string): QueryParams => {
        const trimmedQueryString = data.replace(/^\?/, "");
        const queryObject: QueryParams = {};
        trimmedQueryString.replace(/([^&=]+)=([^&]*)/g, (match, key, value) => {
          queryObject[key] = decodeURIComponent(value);
          return match;
        });
        return queryObject;
      };
      // 변환한 유저 정보 객체 변수 초기화
      const queryParams = parseQueryString(data);
      // console.log("queryParams", queryParams);

      if (queryParams?.accessToken) {
        setUser({
          ...user,
          accessToken: queryParams.accessToken,
          refreshToken: queryParams.refreshToken,
        });
        setToken({
          accessToken: queryParams.accessToken,
          refreshToken: queryParams.refreshToken,
        });
        toast("환영합니다!");
        navigate("/main");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <main className={style.container} role="status" aria-live="polite">
      <section className={style.wrapper}>
        <figure>
          <img src="/images/Loading.webp" alt="로그인 처리 중..." />
          <figcaption className={style.caption}>
            로그인 중입니다. 잠시만 기다려 주세요.
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

export default OAuth;
