"use server"

import { revalidatePath } from "next/cache"
import { createAtividade,updateAtividade,deleteAtividade } from "./atividade"
import { createCartorio,updateCartorio,deleteCartorio } from "./cartorio"
import { createSetor,updateSetor,deleteSetor} from "./setor"



export const handleNewNome = async (tipo:string,nome:string) => {

    if(tipo === "Atividade"){
        const atividade = await createAtividade(nome)
        if(atividade){
            revalidatePath("/private/admin")
        }
        return atividade
    }
    if(tipo === "Cartorio"){
        const cartorio = await createCartorio(nome)
        if(cartorio){
            revalidatePath("/private/admin")
        }
        return cartorio
    }
    if(tipo === "Setor"){
        const setor = await createSetor(nome)
        if(setor){
            revalidatePath("/private/admin")
            revalidatePath("/private/prefeitura/criar")
            revalidatePath("/private/cartorio/criar")
        }
        return(setor)
    }
}

export const handleUpdateNome = async (tipo:string,nome:string,id:string) => {

    if(tipo === "Atividade"){
        const atividade = await updateAtividade({id,nome})
        if(atividade){
            revalidatePath("/private/admin")
        }
        return atividade
    }
    if(tipo === "Cartorio"){
        const cartorio = await updateCartorio({id,nome})
        if(cartorio){
            revalidatePath("/private/admin")
        }
        return cartorio
    }
    if(tipo === "Setor"){
        const setor = await updateSetor({id,nome})
        if(setor){
            revalidatePath("/private/admin")
        }
        return(setor)
    }
}

export const handleDeleteNome = async (tipo:string,id:string) => {

    if(tipo === "Atividade"){
        const atividade = await deleteAtividade(id)
        if(atividade){
            revalidatePath("/private/admin")
        }
        return atividade
    }
    if(tipo === "Cartorio"){
        const cartorio = await deleteCartorio(id)
        if(cartorio){
            revalidatePath("/private/admin")
        }
        return cartorio
    }
    if(tipo === "Setor"){
        const setor = await deleteSetor(id)
        if(setor){
            revalidatePath("/private/admin")
        }
        return(setor)
    }
}