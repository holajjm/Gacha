import { useQuery } from "@tanstack/react-query";

import { ENV } from "@constants/env";
import useCustomAxios from "@hooks/useCustomAxios";
import { useUserStore } from "@store/store";

import type { ItemBookData } from "types/minihome";

export function useItemBookQuery({ text }: { text: string }) {
  const user = useUserStore((state) => state.user);
  const axios = useCustomAxios();
  return useQuery<ItemBookData[]>({
    queryKey: ["Items", text, user],
    queryFn: async (): Promise<ItemBookData[]> => {
      const response = await axios.get(
        `${ENV.SERVER_API}/itembook/${user?.nickname}${text && text}`,
      );
      return response?.data;
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
}
