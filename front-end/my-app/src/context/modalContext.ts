import { createContext, useContext } from "react";

type ModalContextType = {
  authOpened: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  logoutOpened: boolean;
  openLogout: () => void;
  closeLogout: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalContext must be used within a ModalProvider");

  return context;
}
