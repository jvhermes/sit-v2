"use client";

import { createContext, ReactNode } from "react";
import { Perfil, UserPerfilProps } from "@/types/types";

interface AuthContextType {
  user: UserPerfilProps | null;
  loading: boolean;
}

const demoAdminUser: UserPerfilProps = {
  id: "user-admin",
  nome: "Administrador Demo",
  email: "admin@demo.com",
  ativo: true,
  avatar: "1",
  perfil: Perfil.ADMIN,
  cartorio: {
    id: "cartorio-centro",
    nome: "Cartório Centro",
  },
  setor: {
    id: "setor-urbano",
    nome: "Planejamento Urbano",
  },
};

export const AuthContext = createContext<AuthContextType>({
  user: demoAdminUser,
  loading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: demoAdminUser, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}
