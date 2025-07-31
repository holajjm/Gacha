import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReplyItemData } from "types/minihome";

export function useDeleteQuery({ replys }: { replys: ReplyItemData }) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete(
          `/guestbooks/${replys?.guestbookId}`,
        );
        return response?.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["Replys"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
