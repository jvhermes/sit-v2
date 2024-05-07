import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LogUserSchema } from "./schemas/user"
import { getUserbyEmail } from "./data/user";
import prisma from "@/utils/db"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserbyId } from "./data/user"


export default {
  providers: [Credentials({
    async authorize(credentials) {
      const validateFields = LogUserSchema.safeParse(credentials);

      if (validateFields.success) {
        const { email, senha } = validateFields.data

        const user = await getUserbyEmail(email);
        if (!user) {
          return null
        }
        const validSenha = bcrypt.compare(senha,user.senha)

        if(!validSenha){
          return null
        }

        return user
      }

      return null
    }
  })],
  secret: process.env.AUTH_SECRET,
  callbacks:{
    async jwt({token}) {
        if(!token.sub) return token

        const user = await getUserbyId(token.sub)

        if(!user) return token

        token.perfil = user.perfil
        token.cartorio_id = user.cartorio_id
        token.setor_id = user.setor_id
        token.name = user.nome
        token.picture = user.avatar


        return token
    },
    async session({token,session}){
        
        if(token.sub && session.user){
            session.user.id = token.sub
        }

        if(token.perfil && session.user){
            session.user.perfil = token.perfil as string
        }

        if(token.perfil && session.user){
            session.user.cartorio_id = token.cartorio_id as string
        }

        if(token.perfil && session.user){
            session.user.setor_id = token.setor_id as string
        }

   
        return session
    }
},
adapter: PrismaAdapter(prisma),
session: { strategy: "jwt" },
  

} satisfies NextAuthConfig