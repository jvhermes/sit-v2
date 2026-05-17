"use server"

import { demoStore } from "@/data/demo-store"

export const createCartorio = async (nome: string) => {
    return demoStore.createCartorio(nome)
}

interface UpdateCartorio {
    id: string
    nome: string
}

export const updateCartorio = async ({ id, nome }: UpdateCartorio) => {
    return demoStore.updateCartorio(id, nome)
}

export const listCartorio = async () => {
    return demoStore.listCartorios()
}

export const deleteCartorio = async (id: string) => {
    return demoStore.deleteCartorio(id)
}
