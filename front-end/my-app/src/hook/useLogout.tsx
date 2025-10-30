import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api/logout.api";
import { useAuthContext } from "../context/authContext";
import { notifications } from "@mantine/notifications";
import { ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function useLogout() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logoutApi();
      await queryClient.invalidateQueries({ queryKey: ["meme"] });
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(undefined);
      notifications.show({
        title: "Logout Success",
        message: "See you soon at MemeMuseum!",
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
      console.error("Logout error", error);
    },
  });
}
