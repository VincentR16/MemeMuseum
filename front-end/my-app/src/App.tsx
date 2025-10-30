import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routes";
import { AuthProvider } from "./context/authProvider";
import usePersistentLogin from "./hook/usePersistentLogin";

const theme = createTheme({
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#181818",
      "#121212",
      "#101113",
    ],
  },
});

const Component = () => {
  const element = useRoutes(routes);
  return element;
};

function AppContent() {
  usePersistentLogin();

  return (
    <>
      <Notifications />
      <Router>
        <Component />
      </Router>
    </>
  );
}
const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
