import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "../types/LoginRequest.type";
import { loginApi } from "../api/login.api";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useModalContext } from "../context/modalContext";
import { useAuthContext } from "../context/authContext";

export default function useLogin() {
  const { setUser, setLoading, setIsAuthenticated } = useAuthContext();
  const { closeAuthModal } = useModalContext();
  return useMutation({
    mutationFn: (request: LoginRequest) => loginApi(request),

    onSuccess: (data) => {
      setLoading(false);
      setIsAuthenticated(true);
      setUser(data);
      console.log("Login success", data);
      notifications.show({
        title: "Login Success",
        message: "Welcome back to MemeMuseum",
        icon: <IconCheck size={18} />,
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
