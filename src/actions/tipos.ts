"use server"

import { demoStore } from "@/data/demo-store"

export const createTipo = async (nome: string) => {
    return demoStore.createTipo(nome)
}

interface updateTipo {
    idTipo: number
    nome: string
}

export const updateTipo = async ({ idTipo, nome }: updateTipo) => {
    return demoStore.updateTipo(idTipo, nome)
}

export const deleteTipo = async (id: number) => {
    return demoStore.deleteTipo(id)
}
