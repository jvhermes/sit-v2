"use server"

import { z } from "zod"
import { CreateUserSchema, LogUserSchema } from "@/schemas/user"
import { revalidatePath } from "next/cache"
import { demoStore } from "@/data/demo-store"
import { Perfil } from "@/types/types"

export const createUser = async (values: z.infer<typeof CreateUserSchema>) => {
    const validateFields = CreateUserSchema.safeParse(values)
    if (!validateFields.success) return null

    const user = demoStore.createUsuario({
        ...validateFields.data,
        perfil: validateFields.data.perfil as Perfil,
    })

    revalidatePath("/private/admin")
    return user
}

export const getOne = async (id: string) => {
    return demoStore.getUsuario(id)
}

export const updateUser = async (values: z.infer<typeof CreateUserSchema>, id: string) => {
    const validateFields = CreateUserSchema.safeParse(values)
    if (!validateFields.success) return null

    const user = demoStore.updateUsuario(id, {
        ...validateFields.data,
        perfil: validateFields.data.perfil as Perfil,
    })

    revalidatePath("/private/admin")
    return user
}

export const login = async (values: z.infer<typeof LogUserSchema>) => {
    const validateFields = LogUserSchema.safeParse(values)
    if (!validateFields.success) return { error: "Campos inválidos" }

    const user = demoStore.authenticateUsuario(validateFields.data.email, validateFields.data.senha)
    if (!user) return { error: "Email ou senha inválidos" }

    return { data: { user } }
}

export const signout = async () => {
    return { ok: true }
}

export const getMe = async () => {
    return demoStore.getDemoUser()
}

export const updateSenha = async (id: string, senha: string) => {
    const user = demoStore.updateSenha(id, senha)
    revalidatePath("/private/admin")
    return user
}
