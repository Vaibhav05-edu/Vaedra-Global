import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminUser {
  id?: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Check existing Supabase session on initial mount
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        if (session?.user) {
          const email = session.user.email || "";
          const role =
            (session.user.app_metadata?.role as string) ||
            (session.user.user_metadata?.role as string) ||
            "admin";
          const name =
            (session.user.user_metadata?.name as string) ||
            (email.split("@")[0].toUpperCase() === "ADMIN" ? "Vaedra Admin" : email.split("@")[0]);
          const userData: AdminUser = {
            id: session.user.id,
            email,
            name,
            role: role === "admin" ? "Super Admin" : role,
          };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    // 2. Listen to real-time auth state changes (token refreshes, sign in, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        const email = session.user.email || "";
        const role =
          (session.user.app_metadata?.role as string) ||
          (session.user.user_metadata?.role as string) ||
          "admin";
        const name =
          (session.user.user_metadata?.name as string) ||
          (email.split("@")[0].toUpperCase() === "ADMIN" ? "Vaedra Admin" : email.split("@")[0]);
        const userData: AdminUser = {
          id: session.user.id,
          email,
          name,
          role: role === "admin" ? "Super Admin" : role,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();

    try {
      // Authenticate with Supabase Auth to establish a real JWT session
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: pass,
      });

      if (error) {
        let errorMsg = error.message;
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          errorMsg =
            "Invalid email or password. Please verify your credentials (admin@vaedra.global / vaedra2026) or ensure the Supabase migration script (20260908160000_portfolio_table.sql) has been run in the Supabase SQL Editor.";
        }
        return { success: false, error: errorMsg };
      }

      if (data?.user) {
        const role =
          (data.user.app_metadata?.role as string) ||
          (data.user.user_metadata?.role as string) ||
          "admin";
        const name =
          (data.user.user_metadata?.name as string) ||
          (trimmedEmail.split("@")[0].toUpperCase() === "ADMIN"
            ? "Vaedra Admin"
            : trimmedEmail.split("@")[0]);

        const userData: AdminUser = {
          id: data.user.id,
          email: data.user.email || trimmedEmail,
          name,
          role: role === "admin" ? "Super Admin" : role,
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: "Failed to establish administrator session." };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication network error.";
      return {
        success: false,
        error: msg,
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Notice signing out from Supabase:", err);
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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
