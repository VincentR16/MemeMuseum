import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/logoutApi";
import { useAuthContext } from "../context/authContext";
import { notifications } from "@mantine/notifications";
import { ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function useLogout() {
  const { setIsAuthenticated, setUser } = useAuthContext();

  return useMutation({
    mutationFn: async () => {
      await logoutApi();
    },
    onSuccess: () => {
      console.log("Logout success");
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
