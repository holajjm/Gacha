import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { Followings, MiniHomeMainData } from "types/minihome";

export function useUnfollow({ minihomeData,followings }: { minihomeData?: MiniHomeMainData,followings?: Followings }){
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!minihomeData?.nickname) {
        console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
        return;
      }
      if (confirm(`${minihomeData?.nickname || followings?.nickname}님을 언팔로우 할까요?`)) {
        const response = await axios.delete("/users/unfollow", {
          data: {
            followeeUserNickname: minihomeData?.nickname || followings?.nickname,
          },
        });
        // console.log(response?.data);
        toast("언팔로우 되었습니다.");
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      queryClient.invalidateQueries({ queryKey: ["Followings"] });
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