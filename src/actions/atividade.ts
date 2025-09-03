"use server"
import prisma from "@/utils/db"




export const createAtividade = async (nome: string) => {
    const atividadeExiste = await prisma.atividade.findFirst({
        where: {
            nome
        }
    })

    if (atividadeExiste) {
        return null
    }

    const atividade = await prisma.atividade.create({
        data: {
            nome,
        }
    })

    return atividade
}


interface UpdateAtividade {
    id: string
    nome: string
}

export const updateAtividade = async ({ id, nome }: UpdateAtividade) => {


    const atividadeExiste = await prisma.atividade.findFirst({
        where: {
            nome
        }
    })

    if (atividadeExiste) {
        return null
    }

    const atividade = await prisma.atividade.update({
        where: { id },
        data: {
            nome,
        }
    })

    const atividade1 = await fetch('http://localhost:3001'+ new URLSearchParams({id:id}).toString(),{method: "POST",body:JSON.stringify({ nome: nome}),})
    return atividade
}



export const deleteAtividade = async (id: string) => {
    try {
        const atividade = await prisma.atividade.delete({
            where: {
                id
            }
        })

        return atividade

    } catch (err) {
        return null
    }
}
