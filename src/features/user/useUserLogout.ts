import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useUserLogout() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      if (confirm("로그아웃 하시겠습니까?")) {
        try {
          const response = axios.delete("/logout", {});
          sessionStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/");
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
