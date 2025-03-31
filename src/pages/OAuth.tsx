import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@store/store";

import style from "@styles/OAuth.module.css";

interface QueryParams {
  [key: string]: string;
}
interface JwtPayload {
  exp: number;
  iat: number;
  nickname: string;
  profile: number;
}
function OAuth() {
  const { user, setUser } = useUserStore((state) => state);
  console.log(user);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
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
      console.log(queryParams);

      const token = String(queryParams?.accessToken);
      const decodedToken: JwtPayload = jwtDecode(token);

      if (queryParams?.accessToken) {
        setUser({
          ...user,
          nickname: decodedToken?.nickname,
          profileId: decodedToken?.profile,
          accessToken: queryParams.accessToken,
          refreshToken: queryParams.refreshToken,
        });
        localStorage.setItem(
          "AccessToken",
          JSON.stringify(queryParams.accessToken),
        );
        localStorage.setItem(
          "RefreshToken",
          JSON.stringify(queryParams.refreshToken),
        );
        alert("환영합니다!");
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
    <div className={style.container}>
      <main className={style.wrapper}>
        <img src="/images/Loading.gif" alt="로그인 중..." />
      </main>
    </div>
  );
}

export default OAuth;
