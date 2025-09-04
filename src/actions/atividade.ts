"use server"
import api from "@/lib/api"



export const createAtividade = async (nome: string) => {

    const atividade = await api.post(`/atividade`, { nome: nome })
    return atividade
}


interface UpdateAtividade {
    id: string
    nome: string
}

export const updateAtividade = async ({ id, nome }: UpdateAtividade) => {

    const atividade = await api.put(`/atividade/${id}`, { nome: nome })
    return atividade
}



export const deleteAtividade = async (id: string) => {
    const atividade = await api.delete(`/atividade/${id}`)
    return atividade
}
