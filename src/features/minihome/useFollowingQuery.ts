import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { MiniHomeMainData } from "types/minihome";

export function useFollowingQuery({
  minihomeData,
}: {
  minihomeData: MiniHomeMainData;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!minihomeData?.nickname) {
        console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
        return;
      }
      if (confirm(`${minihomeData?.nickname}님을 팔로우 할까요?`)) {
        const response = await axios.post("/users/follow", {
          followeeUserNickname: minihomeData?.nickname,
        });
        // console.log(response?.data);
        toast("팔로잉 되었습니다.");
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      // console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
