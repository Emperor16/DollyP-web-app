import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
export function jwtDecode() {}



interface AdminAuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("adminToken"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Validate token on load + whenever token changes
  useEffect(() => {
  if (!token) {
    setIsAuthenticated(false);
    return;
  }

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return;
    }

    // Token is validded
    setIsAuthenticated(true);
  } catch {
    logout();
  }
}, [token]);


  const login = (newToken: string) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
};
