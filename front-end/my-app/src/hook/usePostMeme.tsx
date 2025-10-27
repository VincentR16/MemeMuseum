import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { ThemeIcon } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { IconCheck } from "@tabler/icons-react";
import { postMemeApi } from "../api/postMeme.api";

export default function usePostMeme() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await postMemeApi(data);
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onSuccess: () => {
      console.log("PostMeme success");
      notifications.show({
        title: "Meme Post Success",
        message: "Check out your meme in the archive!",
        icon: (
          <ThemeIcon radius="xl" color="violet">
            <IconCheck size={18} />
          </ThemeIcon>
        ),
        position: "top-right",
        loading: false,
        autoClose: 3500,
      });
    },
    onError: (error) => {
      console.error("PostMeme error", error);
      notifications.show({
        title: "Meme Post Error",
        message: "We are sorry, try later",
        color: "red",
        position: "top-right",
        loading: false,
        autoClose: 3500,
      });
    },
  });
}
