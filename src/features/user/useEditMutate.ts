import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { useUserStore } from "@store/store";

import { toast } from "react-toastify";
import type { UserData } from "types/user";

export function useEditMutate() {
  const axios = useCustomAxios();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: UserData) => {
      const response = await axios.put("/userInfo", {
        nickname: formData?.nickname,
        profileId: formData?.profileId,
      });
      setUser({
        ...user,
        nickname: formData?.nickname,
        profileId: formData?.profileId,
      });
      navigate(`/minihome/${formData?.nickname}`);
      return response?.data;
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
        return;
      }
      toast("수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
