import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface AdminAuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("adminToken")
  );

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  const isAuthenticated = !!token;

  return (
    <AdminAuthContext.Provider
      value={{ token, isAuthenticated, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
};
