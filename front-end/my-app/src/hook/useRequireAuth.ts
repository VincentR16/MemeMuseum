import { useAuthContext } from "../context/authContext";
import { useModalContext } from "../context/modalContext";

export function useRequireAuth() {
  const { isAuthenticated } = useAuthContext();
  const { openAuthModal } = useModalContext();

  return (callback: () => void) => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      callback();
    }
  };
}
