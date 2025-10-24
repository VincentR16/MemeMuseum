import { useDisclosure } from "@mantine/hooks";
import type { ReactNode } from "react";
import { ModalContext } from "./modalContext";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [authOpened, { open, close }] = useDisclosure(false);

  return (
    <ModalContext.Provider
      value={{
        authOpened,
        openAuthModal: open,
        closeAuthModal: close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
