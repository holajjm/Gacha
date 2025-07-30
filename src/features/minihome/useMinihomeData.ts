import { useQuery } from "@tanstack/react-query";

import { ENV } from "@constants/env";
import useCustomAxios from "@hooks/useCustomAxios";
import { useUserStore } from "@store/store";

export function useMinihomeData({
  nickname,
}: {
  nickname: string | undefined;
}) {
  const user = useUserStore((state) => state.user);
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["Minihome", user, nickname],
    queryFn: async () => {
      const response = await axios.get(
        `${ENV.SERVER_API}/minihomes/${nickname && nickname}`,
      );
      return response?.data;
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
}
