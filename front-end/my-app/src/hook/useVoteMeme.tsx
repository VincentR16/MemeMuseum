import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { downvoteMemeApi, upvoteMemeApi } from "../api/voteMeme.api";
import type { Vote } from "../types/Vote.type";

function useVoteMutation(voteFn: (memeId: string) => Promise<Vote>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meme"] });
      queryClient.invalidateQueries({ queryKey: ["daily"] });

    },
    onError: (error: Error) => {
      console.error("Vote error:", error);
      notifications.show({
        color: "red",
        title: "Error",
        message: "It is not possible to vote the meme, try later",
        autoClose: 3500,
      });
    },
  });
}

export function useUpvoteMeme() {
  return useVoteMutation(upvoteMemeApi);
}

export function useDownvoteMeme() {
  return useVoteMutation(downvoteMemeApi);
}
