import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "../types/LoginRequest.type";
import { loginApi } from "../api/login.api";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { useAuthContext } from "../context/authContext";
import { ThemeIcon } from "@mantine/core";

export default function useLogin() {
  const { setUser, setLoading, setIsAuthenticated } = useAuthContext();
  const { closeAuthModal } = useModalContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LoginRequest) => loginApi(request),

    onSuccess: async (data) => {
      setLoading(false);
      setIsAuthenticated(true);
      setUser(data);

      await queryClient.invalidateQueries({ queryKey: ["meme"] });

      notifications.show({
        title: "Login Success",
        message: "Welcome back to MemeMuseum",
        icon: (
          <ThemeIcon radius="xl" color="violet">
            <IconCheck size={18} />
          </ThemeIcon>
        ),
        position: "top-right",
        loading: false,
        autoClose: 3500,
      });

      closeAuthModal();
    },

    onError: (error) => {
      setIsAuthenticated(false);
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Invalid Email or Password",
        message: "try again!",
        autoClose: 3500,
      });
      console.error("Login error", error);
    },
  });
}
