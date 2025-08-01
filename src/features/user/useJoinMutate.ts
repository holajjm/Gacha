import { ENV } from "@constants/env";
import { useUserStore } from "@store/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { QueryParams, UserData } from "types/user";

export function useJoinMutate({loginParams}:{loginParams: QueryParams}) {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (formData: UserData) => {
      try {
        const authAxios = axios.create({
          baseURL: ENV.SERVER_API,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await authAxios.post("/join", {
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData.nickname,
          profileId: +formData?.profileId,
        });
        console.log(response);
        if (response?.status === 200) {
          setUser({
            socialType: loginParams?.socialType,
            loginId: loginParams?.loginId,
            nickname: formData?.nickname,
            profileId: +formData?.profileId,
            accessToken: "",
            refreshToken: "",
          });
          window.location.href = response?.request?.responseURL;
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data?.data?.error) {
        alert(data?.data?.error?.message);
        return;
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}