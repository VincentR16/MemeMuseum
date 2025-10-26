import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { ModalProvider } from "./context/modalProvider";
import InitialRedirect from "./utils/InitialRedirect";
import RootLayout from "./pages/rootLayout.page";
import ArchivePage from "./pages/archive.page";

export const routes = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <InitialRedirect />,
      },
      {
        path: "home",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="archive" replace />,
          },
          {
            path: "archive",
            element: <ArchivePage />,
          },
        ],
      },
    ],
  },
];