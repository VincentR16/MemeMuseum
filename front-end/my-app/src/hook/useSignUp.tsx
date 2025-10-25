import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest } from "../types/RegisterRequest.types";
import { signUpApi } from "../api/signUp.api";
import type { User } from "../types/User.types";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { useAuthContext } from "../context/authContext";

export default function useSignUp() {
  const { setUser, setIsAuthenticated, setLoading } = useAuthContext();
  const { closeAuthModal } = useModalContext();

  return useMutation({
    mutationFn: async (request: RegisterRequest) => {
      const user: User = await signUpApi(request);
      return user;
    },

    onSuccess: (user) => {
      console.log("Registration success", user);
      notifications.show({
        title: "Registration Success",
        message: "Welcome to MemeMuseum",
        icon: <IconCheck size={18} />,
        loading: false,
        autoClose: 3500,
      });
      setIsAuthenticated(true);
      setUser(user);
      setLoading(false);
      closeAuthModal();
    },

    onError: (error) => {
      setIsAuthenticated(false);
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Invalid Form",
        message: "Your Email or Username is already in our system",
        autoClose: 3500,
      });
      console.error("Register error", error);
    },
  });
}
