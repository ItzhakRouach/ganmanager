import { createContext, useState, ReactNode } from "react";
import type { User, AuthContextType } from "../types";

// create context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

//Provider Compenetes - wraps the whole app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage so user stays logged in on refresh
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const login = (newToken: string, newUser: User) => {
    // Save to state
    setToken(newToken);
    setUser(newUser);
    // Save to localStorage so it persists on page refresh
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token, // !! converts to boolean
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
