import { Navigate, Outlet } from "react-router-dom";
import { ModalProvider } from "./context/modalProvider";
import RootLayout from "./pages/rootLayout.page";
import ArchivePage from "./pages/archive.page";

export const routes = [
  {
    path: "/",
    element: (
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home/archive" replace />,
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
