"use server"
import prisma from "@/utils/db"




export const createCartorio = async (nome:string) => {
    const cartorioExiste = await prisma.cartorio.findFirst({
        where:{
            nome
        }
    })

    if(cartorioExiste){
        return null
    }

    const cartorio = await prisma.cartorio.create({
        data:{
            nome,
        }
    })

    return cartorio
}


interface UpdateCartorio{
    id:string
    nome:string
}

export const updateCartorio = async ({id,nome}:UpdateCartorio) => {


    const cartorioExiste = await prisma.cartorio.findFirst({
        where:{
            nome
        }
    })

    if(cartorioExiste){
        return null
    }

    const cartorio = await prisma.cartorio.update({
        where:{id},
        data:{
            nome,
        }
    })

    return cartorio
}



export const deleteCartorio = async (id:string) => {

    try
    {const cartorio = await prisma.cartorio.delete({
        where:{
            id
        }
    })
    return cartorio
    }catch(err){
        return null
    }


}
