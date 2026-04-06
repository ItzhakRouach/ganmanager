import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Custom hook - so we don't have to import useContext everywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
