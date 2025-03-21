"use server"
import prisma from "@/utils/db"




export const createTipo = async (nome: string) => {
    const tipoExiste = await prisma.tipoDeProcesso.findFirst({
        where: {
            nome
        }
    })

    if (tipoExiste) {
        return null
    }

    const tipo = await prisma.tipoDeProcesso.create({
        data: {
            nome,
            tipo:"OUTRO"
        }
    })

    return tipo
}


interface updateTipo {
    idTipo: number
    nome: string
}

export const updateTipo = async ({ idTipo, nome }: updateTipo) => {


    const tipoExiste = await prisma.tipoDeProcesso.findFirst({
        where: {
            nome
        }
    })

    if (tipoExiste) {
        return null
    }

    const tipo = await prisma.tipoDeProcesso.update({
        where: { id:idTipo },
        data: {
            nome,
        }
    })

    return tipo
}



export const deleteTipo = async (id: number) => {
    try {
        const tipo = await prisma.tipoDeProcesso.delete({
            where: {
                id
            }
        })

        return tipo

    } catch (err) {
        return null
    }
}
