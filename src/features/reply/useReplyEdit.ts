import useCustomAxios from "@hooks/useCustomAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ReplyData, ReplySendData } from "types/minihome";

export function useReplyEdit({
  replys,
  editReplyResult,
}: {
  replys: ReplyData;
  editReplyResult: () => void;
}) {
  const axios = useCustomAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: ReplySendData) => {
      if (confirm("수정하시겠습니까?")) {
        const response = await axios.put(`/guestbooks/${replys?.guestbookId}`, {
          content: formData.content,
        });
        return response?.data;
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["Replys"] });
      toast("수정되었습니다.");
      editReplyResult();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
