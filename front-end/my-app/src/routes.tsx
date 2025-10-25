import { AuthProvider } from "./context/authProvider";
import { ModalProvider } from "./context/modalProvider";
import RootLayout from "./pages/rootLayout.page";
import InitialRedirect from "./utils/InitialRedirect";

export const routes = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <InitialRedirect></InitialRedirect>
      </AuthProvider>
    ),
  },
  {
    path: "/home",
    element: (
      <AuthProvider>
        <ModalProvider>
          <RootLayout />
        </ModalProvider>
      </AuthProvider>
    ),
  },
];
