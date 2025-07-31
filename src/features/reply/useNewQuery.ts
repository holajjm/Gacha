import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReplySendData } from "types/minihome";

export function useNewQuery({
  nickname,
  reset,
}: {
  nickname: string | undefined;
  reset: () => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: ReplySendData) => {
      try {
        const response = await axios.post(`/guestbooks/${nickname}`, {
          content: formData.content,
        });
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
      reset();
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
}
