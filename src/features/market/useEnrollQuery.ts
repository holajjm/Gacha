import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { Item } from "types/market";

export function useEnrollQuery({ item }: { item: Item }) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (confirm("상품을 판매하시겠습니까?")) {
        try {
          const response = await axios.post("/products", {
            userItemId: item?.userItemIds[0],
          });
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        console.log(data?.error?.message);
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["EnrollItemList"] });
      queryClient.invalidateQueries({ queryKey: ["SellingItems"] });
      queryClient.invalidateQueries({ queryKey: ["MarketItem"] });
      toast("상품이 등록되었습니다!");
      // console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
