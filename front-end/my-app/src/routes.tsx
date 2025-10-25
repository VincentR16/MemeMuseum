import { AuthProvider } from "./context/authProvider";
import { ModalProvider } from "./context/modalProvider";
import RootLayout from "./pages/rootLayout.page";

export const routes = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <ModalProvider>
          <RootLayout />
        </ModalProvider>
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
