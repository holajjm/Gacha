import useCustomAxios from "@hooks/useCustomAxios";
import { useTokenStore, useUserStore } from "@store/store";
import { useQuery } from "@tanstack/react-query";

export function useGetUserInfo() {
  const user = useUserStore((state) => state?.user);
  const setUser = useUserStore((state) => state?.setUser);
  const accessToken = useTokenStore((state) => state.accessToken);
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["User"],
    queryFn: async () => {
      try {
        const response = await axios.get("/userInfo");
        setUser({
          ...user,
          nickname: response?.data?.nickname,
          profileId: response?.data?.profileId,
        });
        return response;
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    },
    enabled: !!user && !!accessToken,
  });
}
