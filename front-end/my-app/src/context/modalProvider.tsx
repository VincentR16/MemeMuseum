import { useDisclosure } from "@mantine/hooks";
import type { ReactNode } from "react";
import { ModalContext } from "./modalContext";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [authOpened, { open: openAuthModal, close: closeAuthModal }] =
    useDisclosure(false);
  const [logoutOpened, { open: openLogout, close: closeLogout }] =
    useDisclosure(false);
  const [memeOpened, { open: openMeme, close: closeMeme }] =
    useDisclosure(false);

  return (
    <ModalContext.Provider
      value={{
        logoutOpened,
        openLogout,
        closeLogout,
        authOpened,
        openAuthModal,
        closeAuthModal,
        memeOpened,
        closeMeme,
        openMeme,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
