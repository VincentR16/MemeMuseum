import { Navigate } from "react-router-dom";

import { Flex, Loader, ThemeIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import usePersistentLogin from "../hook/usePersistentLogin";
import { useAuthContext } from "../context/authContext";

export default function InitialRedirect() {
  //uso hook per vedere se ci sono ancora refresh e access token
  usePersistentLogin();
  const { isAuthenticated, isLoading } = useAuthContext();
  const hasShownNotification = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !hasShownNotification.current) {
      notifications.show({
        title: "Welcome back to MemeMuseum!",
        message: "You're already logged in.",
        icon: (
          <ThemeIcon radius="xl" color="violet">
            <IconCheck size={18} />
          </ThemeIcon>
        ),
        loading: false,
        autoClose: 3500,
        position: "top-right",
      });
      hasShownNotification.current = true;
    }
  }, [isAuthenticated]);

  if (isLoading)
    return (
      <Flex justify="center" align="center" h="100vh" w="100%">
        <Loader color="violet" />
      </Flex>
    );

  //se l utente ha ancora questi token e sono validi viene renderizzaro in home altrimenti in welcome dove fare il login
  return <Navigate to="/home" replace />;
}
