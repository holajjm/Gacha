import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";

function useCustomAxios() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user, setUser } = useUserStore((state) => state);
  const accessToken = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  
  // Axios Instance 생성
  const instance = axios.create({
    baseURL: SERVER_API,
    timeout: 1000 * 20,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Refresh Token을 활용하여 Access Token 재발급 로직
  const postRefreshToken = async () => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await axios.post(`${SERVER_API}/tokens/renew`, {
        headers: {
          refreshToken: localStorage.getItem("RefreshToken"),
        },
      });
      console.log({ accessToken, refreshToken });
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
    }
  };

  // Request Interceptors
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("AccessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response Interceptors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      console.log(config);

      if (response.status === 401) {
        if (config.url === "/token/renew") {
          if (
            confirm("토큰이 만료되었습니다. 로그인 페이지로 이동하시겠습니까?")
          ) {
            navigate("/login");
          } else {
            const newToken = await postRefreshToken();
            if (newToken) {
              setUser({
                ...user,
                accessToken: newToken?.accessToken,
                refreshToken: newToken?.refreshToken,
              });
              config.headers["Authorization"] =
                `Bearer ${newToken?.accessToken}`;
              return axios(config);
            }
          }
        }
      } else {
        return Promise.reject(error);
      }
    },
  );
  return instance;
}

export default useCustomAxios;
