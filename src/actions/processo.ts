"use server"
import { format, toDate, isAfter } from "date-fns"
import { Processos } from "@/app/private/prefeitura/columns"
import { CreateProcessSquema, RespostaLoteSquema, RespostaPessoaSquema } from "@/schemas/process"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import api from "@/lib/api"
import { Lote } from "../../types/types"

export const deleteProcesso = async (id: number | unknown) => {

    if(typeof(id) !== "number"){
        return
    }
    try {
        await prisma.processoPrefeituraToLotee.deleteMany({
            where: {
                processo_id: id
            }
        })
        await prisma.descricaoLotes.deleteMany({
            where: {
                processo_id: id
            }
        })
        await prisma.descricaoPessoas.deleteMany({
            where: {
                processo_prefeitura_id: id
            }
        })
        const processo = await prisma.processoPrefeitura.delete({
            where: {
                id
            }
        })

        return processo
    } catch {
        return null
    }

}

export const createProcesso = async (values: z.infer<typeof CreateProcessSquema>, lote_ids: Lote[]) => {

    const validateFields = CreateProcessSquema.safeParse(values)
    const session = await auth()

    if (!session) {
        return null
    }

    if (!validateFields.success) {
        return null
    }
    const { num_processo, prazo, ano, texto, tipo, atividade, cartorio, descricao_lotes, descricao_pessoas } = validateFields.data
    const processoExiste = await prisma.processoPrefeitura.findFirst({
        where: {
            num_processo: num_processo
        }
    })
    if (processoExiste) {
        return null
    }

    const processo = await prisma.processoPrefeitura.create({
        data: {
            num_processo,
            prazo,
            ano,
            texto,
            tipo_id: parseInt(tipo),
            atividade_id: atividade,
            destino_id: cartorio,
            fonte_id: session.user.setor_id
        }
    })

    for await (let item of lote_ids) {
        await prisma.processoPrefeituraToLotee.create({
            data: {
                lote_id: item.id,
                processo_id: processo.id
            }
        })
    }
    if ((tipo !== '2' && tipo !== '1') && descricao_lotes) {
        const lotesdesc = tipo === '1' ? descricao_lotes : descricao_lotes.length > 1 ? descricao_lotes.slice(1) : descricao_lotes;

        for await (let item of lotesdesc) {
            await prisma.descricaoLotes.create({
                data: {
                    processo_id: processo.id,
                    lote: item.lote,
                    area: item.area,
                    testada: item.testada
                }
            })
        }
    }

    if ((tipo !== '2' && tipo !== '1') && descricao_pessoas) {
        for await (let item of descricao_pessoas) {
            await prisma.descricaoPessoas.create({
                data: {
                    nome: item.nome,
                    cpf: item.cpf,
                    email: item.email,
                    telefone: item.telefone,
                    processo_prefeitura_id: processo.id
                }
            })
        }
    }

    revalidatePath("/private/prefeitura")
    return processo;
}

export const fetchProcessos = async (ativo: boolean): Promise<Processos[]> => {

    const session = await auth()

    if (session && session.user.perfil === "CARTORIO") {
        const res = await prisma.processoPrefeitura.findMany({
            where: {
                ativo,
                destino_id: session?.user.cartorio_id,
            },
            include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
                tipo:true
            }

        })
        const processos = res?.map((item) => {

            const formatedNow = format(new Date(), "yyy-MM-dd")
            const formatedPrazo = format(item.prazo, "yyy-MM-dd")
            const now = toDate(formatedNow)
            const prazoCalc = toDate(formatedPrazo)
            const atrasado = isAfter(now, prazoCalc)

            if (atrasado && item.status === "PENDENTE") {
                updateAtraso(item.id)
                return {
                    id: item.id,
                    numero: item.num_processo.toString(),
                    tipo: item.tipo.nome,
                    proprietario: item.lote[0].lote.proprietario || "",
                    bairro: item.lote[0].lote.bairro || "",
                    quadra: item.lote[0].lote.quadra || "",
                    lote: item.lote[0].lote.lote || "",
                    criado: format(item.criado_em, "dd/MM/yyy"),
                    prazo: format(item.prazo, "dd/MM/yyy"),
                    status: "atrasado"
                }
            }
            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.nome,
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),
                prazo: format(item.prazo, "dd/MM/yyy"),
                status: item.status.toLowerCase()
            }
        })



        return processos
    }
    if (session && session.user.perfil === "PREFEITURA") {


        const res = await prisma.processoPrefeitura.findMany({
            where: {
                ativo,
                fonte_id: session?.user.setor_id,

            },
            include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
                tipo:true
            }

        })
        const processos = res?.map((item) => {

            const formatedNow = format(new Date(), "yyy-MM-dd")
            const formatedPrazo = format(item.prazo, "yyy-MM-dd")
            const now = toDate(formatedNow)
            const prazoCalc = toDate(formatedPrazo)
            const atrasado = isAfter(now, prazoCalc)

            if (atrasado && item.status === "PENDENTE") {
                updateAtraso(item.id)
                return {
                    id: item.id,
                    numero: item.num_processo.toString(),
                    tipo: item.tipo.nome,
                    proprietario: item.lote[0].lote.proprietario || "",
                    bairro: item.lote[0].lote.bairro || "",
                    quadra: item.lote[0].lote.quadra || "",
                    lote: item.lote[0].lote.lote || "",
                    criado: format(item.criado_em, "dd/MM/yyy"),
                    prazo: format(item.prazo, "dd/MM/yyy"),
                    status: "atrasado"
                }
            }
            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.nome,
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),
                prazo: format(item.prazo, "dd/MM/yyy"),
                status: item.status.toLowerCase()
            }
        })



        return processos
    } else {
        const res = await prisma.processoPrefeitura.findMany({
            where: {
                ativo,

            },
            include: {
                lote: {
                    include: {
                        lote: true
                    }
                },
                tipo:true
            }

        })
        const processos = res?.map((item) => {

            const formatedNow = format(new Date(), "yyy-MM-dd")
            const formatedPrazo = format(item.prazo, "yyy-MM-dd")
            const now = toDate(formatedNow)
            const prazoCalc = toDate(formatedPrazo)
            const atrasado = isAfter(now, prazoCalc)

            if (atrasado && item.status === "PENDENTE") {
                updateAtraso(item.id)
                return {
                    id: item.id,
                    numero: item.num_processo.toString(),
                    tipo: item.tipo.nome,
                    proprietario: item.lote[0].lote.proprietario || "",
                    bairro: item.lote[0].lote.bairro || "",
                    quadra: item.lote[0].lote.quadra || "",
                    lote: item.lote[0].lote.lote || "",
                    criado: format(item.criado_em, "dd/MM/yyy"),
                    prazo: format(item.prazo, "dd/MM/yyy"),
                    status: "atrasado"
                }
            }
            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.nome,
                proprietario: item.lote[0].lote.proprietario || "",
                bairro: item.lote[0].lote.bairro || "",
                quadra: item.lote[0].lote.quadra || "",
                lote: item.lote[0].lote.lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),
                prazo: format(item.prazo, "dd/MM/yyy"),
                status: item.status.toLowerCase()
            }
        })



        return processos
    }

}



export const fechData = async () => {

    const [atividades, cartorios, lotes,tipos] = await Promise.all([
        prisma.atividade.findMany(),
        prisma.cartorio.findMany(),
        prisma.lote.findMany(),
        prisma.tipoDeProcesso.findMany()
    ])
    return { atividades, cartorios, lotes,tipos }
}


async function updateAtraso(id: number) {
    await prisma.processoPrefeitura.update({
        where: {
            id
        },
        data: {
            status: "ATRASADO"
        },
    })
}


export const closeProcesso = async (id: number, conclusao: string) => {

    try {
        const processo = await prisma.processoPrefeitura.update({
            where: { id: id },
            data: {
                ativo: false,
                conclusao
            }
        })
        revalidatePath("/private/prefeitura")
        return processo;
    } catch {
        return null
    }
}


export const respondeProcessoLote = async (values: z.infer<typeof RespostaLoteSquema>, processo: ProcessoPrefeitura) => {

    const dataAtual = new Date()
    const validateFields = RespostaLoteSquema.safeParse(values)

    if (!validateFields.success) {
        return null
    }
    const { alvara, descricao, texto } = validateFields.data

    try {
        const aprovacao = await prisma.resposta.create({
            data: {
                observacao: texto,
                alvara,
                processo_id: processo.id
            }
        })

        for await (let item of descricao) {
            await prisma.respostaDescricao.create({
                data: {
                    matricula: item.matricula,
                    data_registro:format(item.data_registro, "dd/MM/yyy") ,
                    transcricao: item.transcricao,
                    lote: item.lote,
                    aprovacao_id: aprovacao.id,
                    descricao_id: item.descricao_id
                }
            })
        }

        await prisma.processoPrefeitura.update({
            where: {
                id: processo.id
            },
            data: {
                status: processo.status === "PENDENTE" ? "RESPONDIDO" : "RESPONDIDO_COM_ATRASO",
                respondido_em: dataAtual
            }
        })
        revalidatePath("/private/cartorio")
        return aprovacao

    } catch {
        return null
    }

}

export const respondeProcessoPessoa = async (values: z.infer<typeof RespostaPessoaSquema>, processo: ProcessoPrefeitura) => {
    const dataAtual = new Date()
    const validateFields = RespostaPessoaSquema.safeParse(values)

    if (!validateFields.success) {
        return null
    }
    const { alvara,  texto } = validateFields.data

    try {
        const aprovacao = await prisma.respostaPessoa.create({
            data: {
                observacao: texto,
                alvara,
                processo_id: processo.id
            }
        })

        await prisma.processoPrefeitura.update({
            where: {
                id: processo.id
            },
            data: {
                status: processo.status === "PENDENTE" ? "RESPONDIDO" : "RESPONDIDO_COM_ATRASO",
                respondido_em: dataAtual
            }
        })
        revalidatePath("/private/cartorio")
        return aprovacao

    } catch {
        return null
    }

}