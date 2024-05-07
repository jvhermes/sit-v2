"use server"
import { revalidatePath } from "next/cache"
import prisma from "@/utils/db"
import { format } from "date-fns"
import { ProcessosCartorio } from "@/app/private/cartorio/columns"
type ProcessoState = "recebidos" | "enviados" | "finalizados"
import { Lote } from "@prisma/client"
import { CreateProcessCartorioSquema } from "@/schemas/processCartorio"
import { auth } from "@/auth"
import z from "zod"

export const deleteProcessoCartorio = async (id: number) => {

    try {
        await prisma.processoCartorioToLotee.deleteMany({
            where: {
                processo_id: id
            }
        })
        await prisma.descricaoLotes.deleteMany({
            where: {
                processo_cartorio_id: id
            }
        })
        await prisma.descricaoPessoas.deleteMany({
            where: {
                processo_cartorio_id: id
            }
        })
        const processo = await prisma.processoCartorio.delete({
            where: {
                id
            }
        })

        return processo
    } catch {
        return null
    }

}

export const closeProcessoCartorio = async (id: number) => {
    const data = new Date()
    try {
        const processo = await prisma.processoCartorio.update({
            where: {
                id
            },
            data: {
                respondido_em: data,
                ativo: false
            }
        })
        revalidatePath("private/prefeitura")
        return processo
    } catch {
        return null
    }
}

export const fetchProcessosCartorio = async (ativo: boolean): Promise<ProcessosCartorio[]> => {


    const session = await auth()

    if (session && session.user.perfil === "CARTORIO") {
        const res = await prisma.processoCartorio.findMany({
            where: {
                ativo,
                fonte_id: session?.user.cartorio_id,
            }, include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
            }

        })
        const processos = res?.map((item) => {

            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.toLowerCase(),
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),

            }
        })

        return processos
    }
    if (session && session.user.perfil === "PREFEITURA") {
        const res = await prisma.processoCartorio.findMany({
            where: {
                ativo,
                destino_id: session?.user.setor_id
            }, include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
            }

        })
        const processos = res?.map((item) => {

            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.toLowerCase(),
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),

            }
        })

        return processos
    } else {
        const res = await prisma.processoCartorio.findMany({
            where: {
                ativo
            }
            , include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
            }

        })
        const processos = res?.map((item) => {

            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.toLowerCase(),
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),

            }
        })

        return processos
    }
}



export const createProcessoCartorio = async (values: z.infer<typeof CreateProcessCartorioSquema>, lote_ids: Lote[]) => {

    const validateFields = CreateProcessCartorioSquema.safeParse(values)
    const session = await auth()

    if (!session) {
        return null
    }

    if (!validateFields.success) {
        return null
    }
    const { num_processo, ano, texto, tipo, atividade, setor, descricao_lotes, descricao_pessoas } = validateFields.data
    const processoExiste = await prisma.processoCartorio.findFirst({
        where: {
            num_processo: num_processo
        }
    })
    if (processoExiste) {
        return null
    }

    const processo = await prisma.processoCartorio.create({
        data: {
            num_processo,

            ano,
            observacao: texto,
            tipo,
            atividade_id: atividade,
            destino_id: setor,
            fonte_id: session.user.cartorio_id
        }
    })

    for await (let item of lote_ids) {
        await prisma.processoCartorioToLotee.create({
            data: {
                lote_id: item.id,
                processo_id: processo.id
            }
        })
    }
    if (tipo !== "OUTRO" && descricao_lotes) {
        const lotesdesc = tipo === "DESMEMBRAMENTO" ? descricao_lotes : descricao_lotes.length > 1 ? descricao_lotes.slice(1) : descricao_lotes;

        for await (let item of lotesdesc) {
            await prisma.descricaoLotes.create({
                data: {
                    processo_cartorio_id: processo.id,
                    lote: item.lote,
                    area: item.area,
                    testada: item.testada
                }
            })
        }
    }

    if (tipo === "OUTRO" && descricao_pessoas) {
        for await (let item of descricao_pessoas) {
            await prisma.descricaoPessoas.create({
                data: {
                    nome: item.nome,
                    cpf: item.cpf,
                    email: item.email,
                    telefone: item.telefone,
                    processo_cartorio_id: processo.id
                }
            })
        }
    }

    revalidatePath("/private/cartorio")
    return processo;
}

export const fechDataCartorio = async () => {

    const [atividades, setores, lotes] = await Promise.all([
        prisma.atividade.findMany(),
        prisma.setor.findMany(),
        prisma.lote.findMany()
    ])
    return { atividades, setores, lotes }
}
