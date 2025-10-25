import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";


const ProtectedRoot = ({ children }: { children: ReactNode }) => {
  // Chiama l'hook per verificare l'autenticazione
  const { isAuthenticated } = useAuthContext();
  // Se stiamo ancora verificando l'autenticazione, mostra loader
  console.log("isauth",isAuthenticated)
  // Solo se NON stiamo caricando E NON siamo autenticati, reindirizza
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }
  // Se arriviamo qui, l'utente è autenticato e può vedere il contenuto
  return children;
};

export default ProtectedRoot;
