import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useUserStore } from "@store/store";

import { toast } from "react-toastify";

export function useDeleteMutate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  return useMutation({
    mutationFn: async () => {
      try {
        const refreshAxios = axios.create({
          baseURL: import.meta.env.VITE_SERVER_API,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.refreshToken}`,
          },
        });
        const response = await refreshAxios.delete("/withdraw");
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        sessionStorage.removeItem("user");
        toast("회원 탈퇴 완료");
        navigate("/main");
        window.location.reload();
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
      queryClient.invalidateQueries({ queryKey: ["User"] });
      console.log(data);
    },
  });
}
