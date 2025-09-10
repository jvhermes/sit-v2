"use server"

import { z } from "zod"
import nookies from 'nookies';
import { CreateUserSchema } from "@/schemas/user"
import { LogUserSchema } from "@/schemas/user"
import { revalidatePath } from "next/cache"
import api from "@/lib/api"
import { redirect } from 'next/navigation'


export const createUser = async (values: z.infer<typeof CreateUserSchema>) => {

    const validateFields = CreateUserSchema.safeParse(values);

    if (!validateFields.success) {
        return null
    }

    const user = api.post("/user", validateFields.data)

    revalidatePath("/private/admin")
    return user


}

export const updateUser = async (values: z.infer<typeof CreateUserSchema>, id: string) => {
    const validateFields = CreateUserSchema.safeParse(values);

    if (!validateFields.success) {
        return null
    }
    const user = api.put(`/user/${id}`, validateFields.data)

    revalidatePath("/private/admin")
    return user

}

export const login = async (values: z.infer<typeof LogUserSchema>) => {

    const validateFields = LogUserSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Campos inválidos" }
    }

    const res = await api.post('/auth/login', validateFields.data)

    const token = res.data.access_token

    nookies.set(null, 'token', token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

}

export const signout = async () => {
    try {
        nookies.destroy({}, 'token  ')
        redirect('/')
    } catch {
        console.log("erro ao deslogar")

    }
}

export const updateSenha = async (id: string, senha: string) => {

    const user = api.put(`/user/${id}/senha`, senha)
    revalidatePath("/private/admin")
    return user

}