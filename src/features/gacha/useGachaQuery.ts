import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useGachaQuery() {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("/gacha", {});
      return response?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["coin"] });
      queryClient.invalidateQueries({ queryKey: ["Items"] });
      queryClient.invalidateQueries({ queryKey: ["EnrollItemList"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
