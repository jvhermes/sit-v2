import prisma from "@/utils/db";

export const getUserbyEmail = async (email: string) => {

    try{
        const user = await prisma.usuario.findUnique({
            where:{
                email
            }
        })

        return user
    }catch{
        return null
    }
}


export const getUserbyId = async (id: string) => {

    try{
        const user = await prisma.usuario.findUnique({
            where:{
                id
            }
        })

        return user
    }catch{
        return null
    }
}