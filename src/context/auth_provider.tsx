"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserPerfilProps } from "@/types/types";

export const DEMO_USER_STORAGE_KEY = "sit-demo-user";

interface AuthContextType {
  user: UserPerfilProps | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPerfilProps | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = window.localStorage.getItem(DEMO_USER_STORAGE_KEY);
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname.startsWith("/private")) {
      router.replace("/");
    }
  }, [loading, pathname, router, user]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
