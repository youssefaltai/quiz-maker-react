import { PropsWithChildren } from "react";
import AuthContext from "../contexts/authContext";
import useLocalStorage from "../hooks/localStorageHook";
import { API_URL } from "../env";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [admin, setAdmin] = useLocalStorage<boolean>("admin", false);

  async function login(password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setAdmin(json.success);
    return json.success;
  }

  function logout() {
    setAdmin(false);
  }

  return <AuthContext.Provider value={{ admin, login, logout }}>
    {children}
  </AuthContext.Provider>;
}
