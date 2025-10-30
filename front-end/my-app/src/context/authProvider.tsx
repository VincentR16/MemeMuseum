import { useState, type ReactNode } from "react";
import type { User } from "../types/User.type";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : undefined;
  });

  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    const saved = localStorage.getItem("isAuthenticated");
    return saved === "true";
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  const setIsAuthenticated = (value: boolean) => {
    setIsAuthenticatedState(value);
    localStorage.setItem("isAuthenticated", value.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
