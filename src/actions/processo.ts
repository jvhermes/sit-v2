"use server"

import { CreateProcessSquema, RespostaLoteSquema, RespostaPessoaSquema } from "@/schemas/process"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { Lote, ProcessoPrefeituraDetail } from "../types/types"
import { demoStore } from "@/data/demo-store"

export const deleteProcesso = async (id: number | unknown) => {
    return demoStore.deleteProcessoPrefeitura(id)
}

export const createProcesso = async (values: z.infer<typeof CreateProcessSquema>, lotes: Lote[]) => {
    const validateFields = CreateProcessSquema.safeParse(values)
    if (!validateFields.success) return null

    const payload = {
        ...validateFields.data,
        lotes_id: lotes.map((item) => item.id),
    }

    const res = demoStore.createProcessoPrefeitura(payload, lotes)
    revalidatePath("/private/prefeitura")
    return res
}

export const fetchProcessos = async () => {
    return demoStore.listProcessosPrefeitura(true)
}

export const fetchProcessosInativo = async () => {
    return demoStore.listProcessosPrefeitura(false)
}

export const getProcessoPrefeitura = async (id: string | number) => {
    return demoStore.getProcessoPrefeitura(id)
}

export const fechData = async () => {
    return demoStore.getCreatePrefeituraData()
}

export const closeProcesso = async (id: number, conclusao: string) => {
    const processo = demoStore.closeProcessoPrefeitura(id, conclusao)
    revalidatePath("/private/prefeitura")
    return processo
}

export const respondeProcessoLote = async (values: z.infer<typeof RespostaLoteSquema>, processo: ProcessoPrefeituraDetail) => {
    const validateFields = RespostaLoteSquema.safeParse(values)
    if (!validateFields.success) return null

    const resposta = demoStore.respondeProcessoLote(validateFields.data, processo.id, processo.status)
    revalidatePath("/private/cartorio")
    revalidatePath(`/private/cartorio/detalhes-p/${processo.id}`)
    revalidatePath(`/private/prefeitura/detalhes-p/${processo.id}`)
    return resposta
}

export const respondeProcessoPessoa = async (values: z.infer<typeof RespostaPessoaSquema>, processo: ProcessoPrefeituraDetail) => {
    const validateFields = RespostaPessoaSquema.safeParse(values)
    if (!validateFields.success) return null

    const resposta = demoStore.respondeProcessoPessoa(validateFields.data, processo.id, processo.status)
    revalidatePath("/private/cartorio")
    revalidatePath(`/private/cartorio/detalhes-p/${processo.id}`)
    revalidatePath(`/private/prefeitura/detalhes-p/${processo.id}`)
    return resposta
}
