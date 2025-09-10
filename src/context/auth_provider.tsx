"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import nookies from "nookies";
import api from "@/lib/api";
import { UserPerfilProps } from "@/types/types";


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

  useEffect(() => {
    const { token } = nookies.get();
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
