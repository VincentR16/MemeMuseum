import { ModalProvider } from "./context/modalProvider";
import RootLayout from "./pages/rootLayout.page";

export const routes = [
  {
    path: "/",
    element: (
      <ModalProvider>
        <RootLayout />
      </ModalProvider>
    ),
  },
  {
    path: "/home",
    element: (
      <ModalProvider>
        <RootLayout />
      </ModalProvider>
    ),
  },
];
