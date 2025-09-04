"use server"
import api from "@/lib/api"




export const createTipo = async (nome: string) => {
    const tipo = await api.post(`/tipo`, { nome: nome })
    return tipo
}

interface updateTipo {
    idTipo: number
    nome: string
}

export const updateTipo = async ({ idTipo, nome }: updateTipo) => {

    const tipo = await api.put(`/tipo/${idTipo}`, { nome: nome })
    return tipo
}



export const deleteTipo = async (id: number) => {
    const tipo = await api.delete(`/tipo/${id}`)
    return tipo
}
