import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { useFollowerModalState } from "@store/store";

import { toast } from "react-toastify";
import type { Followers } from "types/minihome";

export function useDeleteFollowerQuery({ followers }: { followers: Followers }) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  const modalClose = useFollowerModalState((state) => state.modalClose);
  return useMutation({
    mutationFn: async () => {
      if (confirm("팔로워를 삭제할까요?")) {
        const response = await axios.delete(
          `/users/follower/${followers?.nickname}`,
        );
        // console.log(response?.data);
        toast("삭제되었습니다.");
        modalClose();
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Followers"] });
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      // console.log(data);
    },
  });
}
