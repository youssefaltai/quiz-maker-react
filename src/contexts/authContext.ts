import { createContext } from "react";

type AuthContextType = {
  admin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  admin: false,
  login: async () => false,
  logout: () => {}
});

export default AuthContext;
