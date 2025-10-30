import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../components/navbar";
import AuthModal from "../components/authModal";
import LogoutModal from "../components/logoutModal";
import { Outlet } from "react-router-dom";
import PostMemeButton from "../components/postMemeButton";
import MemeModal from "../components/memeModal";
import { useState } from "react";
import { useModalContext } from "../context/modalContext";

export default function RootLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [active, setActive] = useState("Archive");
    const { memeOpened } = useModalContext();

  return (
    <AppShell
      header={{ height: { base: 50, sm: 0 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header
        hiddenFrom="sm"
        style={{
          top: 0,
          zIndex: 200,
        }}
      >
        <Group h={50} px="md">
          <Burger
            color="violet"
            opened={mobileOpened}
            onClick={toggleMobile}
            size="sm"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar setActive={setActive} active={active} />
      </AppShell.Navbar>

      <AppShell.Main>
        {memeOpened && (
          <MemeModal
            setNavabar={setActive}
            toggleMobile={toggleMobile}
            mobileOpened={mobileOpened}
          />
        )}

        <Outlet />
        <PostMemeButton />
      </AppShell.Main>
      
      <AuthModal />
      <LogoutModal />
    </AppShell>
  );
}
