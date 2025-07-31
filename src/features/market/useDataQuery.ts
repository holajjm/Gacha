import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { useUserStore } from "@store/store";

export function useDataQuery({ text }: { text: string }) {
  const user = useUserStore((state) => state.user);
  const axios = useCustomAxios();
  return useQuery({
    queryKey: ["MarketItem", user, text],
    queryFn: async () => {
      const response = await axios.get(`/products${text && text}`);
      return response;
    },
    select: (data) => data?.data,
    throwOnError: true,
  });
}
