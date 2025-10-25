import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../components/navbar";
import AuthModal from "../components/authModal";
import LogoutModal from "../components/logoutModal";

export default function RootLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 50, sm: 0 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md">
          <Burger
            color="violet"
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar></Navbar>
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
      <AuthModal></AuthModal>
      <LogoutModal></LogoutModal>
    </AppShell>
  );
}

// se necessario aggiungere la navbar che si richiude anche per il computer, ma non sembra il caso
