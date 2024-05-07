import NextAuth,{type DefaultSession} from "next-auth";


export type ExtendedUser = DefaultSession["user"] & {
    perfil: string,
    cartorio_id: string,
    setor_id: string
}

declare module "next-auth" {
    interface Session{
        user:ExtendedUser
    }
}