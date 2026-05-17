"use server"

import { demoStore } from "@/data/demo-store"

export const createAtividade = async (nome: string) => {
    return demoStore.createAtividade(nome)
}

interface UpdateAtividade {
    id: string
    nome: string
}

export const updateAtividade = async ({ id, nome }: UpdateAtividade) => {
    return demoStore.updateAtividade(id, nome)
}

export const deleteAtividade = async (id: string) => {
    return demoStore.deleteAtividade(id)
}
