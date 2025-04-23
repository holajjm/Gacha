import axios, { InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";

interface Config extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function useCustomAxios() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user, setUser } = useUserStore((state) => state);
  // console.log(user);
  const navigate = useNavigate();

  // --------------------------------------------------
  // interceptor 없는 axios 인스턴스
  const plainAxios = axios.create();

  // 토큰 재발급 함수
  const getAccessToken = async () => {
    try {
      const response = await plainAxios.post(
        `${SERVER_API}/tokens/renew`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user?.refreshToken}`,
          },
        },
      );
      const { accessToken, refreshToken } = response.data?.data || {};
      if (accessToken && refreshToken) {
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("RefreshToken", refreshToken);
        const updatedUser = {
          ...user,
          accessToken,
          refreshToken,
        };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        return { accessToken, refreshToken };
      }
    } catch (error) {
      console.error("토큰 재발급 실패", error);
      return null;
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await plainAxios.delete(`${SERVER_API}/logout`, {
        headers: {
          Authorization: `Bearer ${user?.refreshToken}`,
        },
      });
      sessionStorage.removeItem("user");
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      
      alert("로그아웃되었습니다. 메인 화면으로 이동합니다.");
      navigate("/main");
      window.location.reload();
    } catch (err) {
      console.error("로그아웃 요청 실패", err);
    }
  };

  // axios 인스턴스
  const instance = axios.create({
    baseURL: SERVER_API,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    async (response) => {
      const config = response.config as Config;

      if (response.data?.data) {
        return response.data;
      }

      // 엑세스 토큰 만료: 서버는 200으로 보내되 error.code === 102
      if (
        response.data?.error &&
        response.data.error.code === 102 &&
        !config._retry &&
        !config.url?.includes("/tokens/renew")
      ) {
        config._retry = true;

        const newTokens = await getAccessToken();
        if (newTokens?.accessToken) {
          config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return instance(config);
        } else {
          // 토큰 재발급 실패
        if (!config.headers["X-Token-Retry"]) {
          config.headers["X-Token-Retry"] = "true"; // 이걸로 재발급 실패 응답에도 confirm 무한 호출 방지
          if (
            confirm("세션이 만료되었습니다. 로그인 페이지로 이동합니다.")
          ) {
            await logout();
            navigate("/main");
          }
        }
        return Promise.reject("토큰 만료. 로그아웃 처리됨.");
        }
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
  // -----------------------------------------------------------

  // // Axios Instance 생성
  // const instance = axios.create({
  //   baseURL: SERVER_API,
  //   timeout: 5000,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });

  // // Refresh Token을 활용하여 Access Token 재발급 로직
  // const getAccessToken = async () => {
  //   try {
  //     const {
  //       data: { accessToken, refreshToken },
  //     } = await axios.create().post(
  //       `${SERVER_API}/tokens/renew`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user?.refreshToken}`,
  //         },
  //       },
  //     );
  //     console.log("재발급 토큰", { accessToken, refreshToken });
  //     return { accessToken, refreshToken };
  //   } catch (error) {
  //     console.error("토큰 재발급 함수 에러", error);
  //   }
  //   // if (user?.refreshToken) {
  //   //   const response = await fetch(`${SERVER_API}/tokens/renew`, {
  //   //     method: "POST",
  //   //     headers: {
  //   //       Authorization: `Bearer ${user?.refreshToken}`,
  //   //     },
  //   //   });
  //   //   const data = await response.json();
  //   //   console.log(data);

  //   //   if (data?.data) {
  //   //     setUser({
  //   //       ...user,
  //   //       accessToken: data?.data?.accessToken,
  //   //       refreshToken: data?.data?.refreshToken,
  //   //     });
  //   //     // setUser((user) => ({
  //   //     //   ...user,
  //   //     //   accessToken: data?.data?.accessToken,
  //   //     //   refreshToken: data?.data?.refreshToken,
  //   //     // }));
  //   //   } else if (data?.error) {
  //   //     console.log(data?.error);
  //   //   }
  //   //   return data;
  //   // }
  // };

  // // 1. 엑세스 토큰 만료 시 리프레쉬 토큰을 헤더에 넣어서 엑세스 토큰 재발급
  // // 2. 리프레쉬 토큰 만료 시 로그아웃 후 로그인 페이지로 이동

  // // Request Interceptors
  // // 요청을 가로채서 토큰이 올바르게 담겨 있는지 확인 후 담겨 있지 않다면 올바르게 담아서 요청 시도
  // instance.interceptors.request.use(
  //   async (config) => {
  //     const token = user?.accessToken;
  //     if (token) {
  //       console.log(
  //         "엑세스 토큰이 포함되지 않았습니다. 엑세스 토큰 포함을 시도합니다.",
  //       );
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );

  // let isLoggingOut = false;
  // const logout = async () => {
  //   if (isLoggingOut) return;
  //   isLoggingOut = true;
  //   try {
  //     await fetch(`${SERVER_API}/logout`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.refreshToken}`,
  //       },
  //     });
  //     sessionStorage.removeItem("user");
  //     localStorage.removeItem("AccessToken");
  //     localStorage.removeItem("RefreshToken");

  //     alert("로그아웃되었습니다. 메인 화면으로 이동합니다.");
  //   } catch (err) {
  //     console.error("로그아웃 실패", err);
  //   }
  //   // navigate("/main");
  // };
  // // Response Interceptors
  // instance.interceptors.response.use(
  //   async (response) => {
  //     // 1.응답을 가로채서 아무 이상이 없으면 response 값 그대로 반환
  //     if (response?.data?.data) {
  //       console.log(response?.data?.data);
  //       return response.data;
  //     }
  //     if (response?.data?.error && response.data.error.code === 102) {
  //       console.log("Response Interceptor Response", response?.data?.error);
  //       const config = response.config as Config;
  //       // console.log(config.headers);
  //       console.log(config.url);

  //       if (!config._retry) {
  //         config._retry = true;
  //         const newTokens = await getAccessToken();
  //         if (newTokens) {
  //           setUser({
  //             ...user,
  //             accessToken: newTokens?.accessToken,
  //             refreshToken: newTokens?.refreshToken,
  //           });
  //           config.headers.Authorization = `Bearer ${newTokens?.accessToken}`;
  //           return instance(config);
  //         } else if (config?.url?.includes("/tokens/renew")) {
  //           if (confirm("토큰이 만료되었습니다. 로그인 페이지로 이동합니다.")) {
  //             await logout();
  //             navigate("/main");
  //           }
  //           return Promise.reject("Refresh token expired. Logged out.");
  //         }
  //       }

  //       // if (config?.url === `${SERVER_API}/tokens/renew`) {
  //       //   if (confirm("토큰이 만료되었습니다. 로그인 페이지로 이동합니다.")) {
  //       //     await logout();
  //       //     navigate("/main");
  //       //   }
  //       // } else {
  //       //   const newTokens = await getAccessToken(instance);
  //       //   console.log("newTokens", newTokens);

  //       //   if (newTokens) {
  //       //     setUser({
  //       //       ...user,
  //       //       accessToken: newTokens?.accessToken,
  //       //       refreshToken: newTokens?.refreshToken,
  //       //     });
  //       //     config.headers.Authorization = `Bearer ${newTokens?.accessToken}`;
  //       //   }
  //       // }

  //       // if (!config._retry) {
  //       //   config._retry = true;
  //       //   try {
  //       //     const newTokens = await getAccessToken(instance);
  //       //     console.log("토큰 재발급 로직 결과", newTokens);
  //       //     if (newTokens?.data) {
  //       //       console.log("토큰 재발급 성공", newTokens.data);
  //       //       setUser({
  //       //         ...user,
  //       //         accessToken: newTokens?.data?.accessToken,
  //       //         refreshToken: newTokens?.data?.refreshToken,
  //       //       });
  //       //       // setUser((user) => ({
  //       //       //   ...user,
  //       //       //   accessToken: newTokens?.data?.accessToken,
  //       //       //   refreshToken: newTokens?.data?.refreshToken,
  //       //       // }));
  //       //       config.headers.Authorization = `Bearer ${newTokens?.data?.accessToken}`;
  //       //       // alert("두가지 토큰 재발급 후 재요청 완료");
  //       //       return instance(config);
  //       //     } else if (!newTokens?.data) {
  //       //       if (!isLoggingOut) {
  //       //         isLoggingOut = true;
  //       //         console.log("리프레시 만료", newTokens?.error);
  //       //         console.error("토큰 갱신 실패");

  //       //         // alert("리프레시 토큰이 만료되었습니다. 재로그인 해주세요.");
  //       //         if (
  //       //           confirm("리프레시 토큰이 만료되었습니다. 재로그인 해주세요.")
  //       //         ) {
  //       //           await logout();
  //       //         }
  //       //       }
  //       //       return Promise.reject("Refresh token expired. Logged out.");
  //       //     }
  //       //   } catch (error) {
  //       //     console.error(error);
  //       //   }
  //       // }
  //     }
  //     return response;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   },
  // );
  // return instance;
}

export default useCustomAxios;
