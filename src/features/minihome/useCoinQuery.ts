import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCoinQuery() {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("/attend", null);
      // console.log(response?.data);
      return response?.data;
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
      } else {
        toast(`출석 체크 완료! 코인 ${data?.bonusCoin}개 획득!`);
        queryClient.invalidateQueries({ queryKey: ["coin"] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
