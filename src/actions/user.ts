"use server"

import { signOut } from "@/auth"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/utils/db"
import { CreateUserSchema } from "@/schemas/user"
import { LogUserSchema } from "@/schemas/user"
import { defaultRedirect } from "@/routes"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"

export const createUser = async (values: z.infer<typeof CreateUserSchema>) => {

    const validateFields = CreateUserSchema.safeParse(values);

    if (!validateFields.success) {
        return null
    }
    const { email, senha, nome, perfil, cartorio_id, setor_id, avatar, ativo } = validateFields.data;
    const hashedSenha = await bcrypt.hash(senha, 10);

    const setor_idReserva = await prisma.setor.findFirst()
    const cartorio_idReserva = await prisma.cartorio.findFirst()

   
    const userExists = await prisma.usuario.findUnique({
        where: {
            email
        },
        select: {
            email: true
        }
    })

    if (userExists) {
        return null
    }
    if(setor_idReserva && cartorio_idReserva){
        const user = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashedSenha,
                perfil,
                cartorio_id:cartorio_id || cartorio_idReserva.id,
                setor_id:setor_id || setor_idReserva.id,
                avatar,
                ativo
            }
        })
    
        revalidatePath("/private/admin")
        return user
    }

}

export const updateUser = async (values: z.infer<typeof CreateUserSchema>, id: string) => {
    const validateFields = CreateUserSchema.safeParse(values);

    if (!validateFields.success) {
        return null
    }
    const { email, senha, nome, perfil, cartorio_id, setor_id, avatar, ativo } = validateFields.data;

    if (senha) {
        const hashedSenha = await bcrypt.hash(senha, 10);


        const user = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nome,
                email,
                senha: hashedSenha,
                perfil,
                cartorio_id: cartorio_id || null,
                setor_id: setor_id || null,
                avatar,
                ativo
            }
        })

        revalidatePath("/private/admin")
        return user
    } else {


        const user = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nome,
                email,
                perfil,
                cartorio_id: cartorio_id || null,
                setor_id: setor_id || null,
                avatar,
                ativo
            }
        })

        revalidatePath("/private/admin")
        return user
    }
}

export const login = async (values: z.infer<typeof LogUserSchema>) => {

    const validateFields = LogUserSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Campos inválidos" }
    }

    const { email, senha } = validateFields.data
    try {
        await signIn("credentials", {
            email, senha, redirectTo: defaultRedirect,
        })

    } catch (err) {
        if (err instanceof AuthError) {
            return { error: "Email ou senha incorretos" }
        }
        throw err
    }

}

export const signout = async () => {
    await signOut()
}

export const updateSenha = async(id:string,senha:string) => {
    
    const hashedSenha = await bcrypt.hash(senha, 10);

    try{
        const user = await prisma.usuario.update({
            where:{
                id
            },
            data:{
                senha:hashedSenha
            }
        })

        return user
    }catch{
        return null
    }
    
}