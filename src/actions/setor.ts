"use server"
import prisma from "@/utils/db"


export const createSetor = async (nome: string) => {
    const setorExiste = await prisma.setor.findFirst({
        where: {
            nome
        }
    })

    if (setorExiste) {
        return null
    }

    const setor = await prisma.setor.create({
        data: {
            nome,
        }
    })

    return setor
}


interface UpdateSetor {
    id: string
    nome: string
}

export const updateSetor = async ({ id, nome }: UpdateSetor) => {


    const setorExiste = await prisma.setor.findFirst({
        where: {
            nome
        }
    })

    if (setorExiste) {
        return null
    }

    const setor = await prisma.setor.update({
        where: { id },
        data: {
            nome,
        }
    })

    return setor

}



export const deleteSetor = async (id: string) => {
    try {
        const setor = await prisma.setor.delete({
            where: {
                id
            }
        })
        return setor
    } catch (err) {
        return null
    }
}
