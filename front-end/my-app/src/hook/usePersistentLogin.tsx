import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/authContext";
import { getMeApi } from "../api/getMe.api";
import { notifications } from "@mantine/notifications";
import { ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function usePersistentLogin() {
  const { setUser, setIsAuthenticated, setLoading } = useAuthContext();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const checkLogin = async () => {
      try {
        setLoading(true);
        const user = await getMeApi();
        notifications.show({
          title: "Welcome to MemeMuseum",
          message: "You are already logged!",
          icon: (
            <ThemeIcon radius="xl" color="violet">
              <IconCheck size={18} />
            </ThemeIcon>
          ),
          position: "top-right",
          loading: false,
          autoClose: 3500,
        });
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Not logged in or token expired", error);
        setIsAuthenticated(false);
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [setIsAuthenticated, setUser, setLoading]);
}
