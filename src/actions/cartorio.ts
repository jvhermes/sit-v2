"use server"

import api from "@/lib/api"

export const createCartorio = async (nome: string) => {
    const cartorio = await api.post(`/cartorio`, { nome: nome })
    return cartorio
}


interface UpdateCartorio {
    id: string
    nome: string
}

export const updateCartorio = async ({ id, nome }: UpdateCartorio) => {

    const cartorio = await api.put(`/cartorio/${id}`, { nome: nome })
    return cartorio
}



export const deleteCartorio = async (id: string) => {

    try {

        const cartorio = await api.delete(`/cartorio/${id}`)
        return cartorio
    } catch (err) {
        return null
    }


}
