"use server"

import api from "@/lib/api"

export const createSetor = async (nome: string) => {

    const setor = await api.post(`/setor`, { nome: nome })
    return setor
}


interface UpdateSetor {
    id: string
    nome: string
}

export const updateSetor = async ({ id, nome }: UpdateSetor) => {

    const setor = await api.put(`/setor/${id}`, { nome: nome })
    return setor

}



export const deleteSetor = async (id: string) => {
    const setor = await api.delete(`/setor/${id}`)
    return setor
}
