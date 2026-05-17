"use server"

import { demoStore } from "@/data/demo-store"

export const createSetor = async (nome: string) => {
    return demoStore.createSetor(nome)
}

interface UpdateSetor {
    id: string
    nome: string
}

export const updateSetor = async ({ id, nome }: UpdateSetor) => {
    return demoStore.updateSetor(id, nome)
}

export const listSetor = async () => {
    return demoStore.listSetores()
}

export const deleteSetor = async (id: string) => {
    return demoStore.deleteSetor(id)
}
