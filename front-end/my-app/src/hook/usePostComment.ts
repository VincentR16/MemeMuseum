import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentApi } from "../api/postComment.api";
import type { CommentRequest } from "../types/CommentRequest";
import { notifications } from "@mantine/notifications";

export default function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memeId,
      content,
    }: {
      memeId: string;
      content: CommentRequest;
    }) => postCommentApi(memeId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Erorr",
        message:
          "We're sorry, it is not possible to leave a comment, try later!",
        autoClose: 3500,
      });
    },
  });
}
