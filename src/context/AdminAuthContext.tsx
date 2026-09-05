import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "vaedra_admin_session";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  });

  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  });

  const login = (email: string, pass: string): boolean => {
    // Configured admin credentials or any authorized company admin
    const trimmedEmail = email.trim().toLowerCase();
    const validEmails = ["admin@vaedra.global", "vaedra@admin.com", "parth@vaedra.global"];
    
    // Check credentials: standard demo password is "vaedra2026" or "admin123"
    const isValid = (validEmails.includes(trimmedEmail) || trimmedEmail.endsWith("@vaedra.global")) && 
                    (pass === "vaedra2026" || pass === "admin123" || pass === "vaedra");

    if (isValid || (trimmedEmail === "admin@vaedra.global" && pass === "vaedra2026")) {
      const userData: AdminUser = {
        email: trimmedEmail,
        name: trimmedEmail.split("@")[0].toUpperCase() === "ADMIN" ? "Vaedra Admin" : trimmedEmail.split("@")[0],
        role: "Super Admin",
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
