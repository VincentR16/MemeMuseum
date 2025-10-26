import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { getMeApi } from "../api/getMe.api";

export default function usePersistentLogin() {
  const { setUser, setIsAuthenticated, setLoading } = useAuthContext();

  useEffect(() => { 
    const checkLogin = async () => {
      try {
        // Imposto il caricamento
        setLoading(true);
        // Provo una getMe sull'utente
        const user = await getMeApi();
        // Setto i dati recuperati
        setUser(user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        setUser(undefined);
      } finally {
        setLoading(false); // Fine loading
      }
    };
    checkLogin();
  }, [setIsAuthenticated, setLoading, setUser]);
}
