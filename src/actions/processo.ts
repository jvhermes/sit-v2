"use server"

import { Processos } from "@/app/private/prefeitura/columns"
import { CreateProcessSquema, RespostaLoteSquema, RespostaPessoaSquema } from "@/schemas/process"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import api from "@/lib/api"
import { Atividade, Cartorio, Lote,ProcessoPrefeituraDetail , Tipo } from "../types/types"

export const deleteProcesso = async (id: number | unknown) => {

    const cartorio = await api.delete(`/processop/${id}`)

    return cartorio
}

export const createProcesso = async (values: z.infer<typeof CreateProcessSquema>, lotes_id: Lote[]) => {

    const validateFields = CreateProcessSquema.safeParse(values)
    if (!validateFields.success) {
        return null;
    }

    const payload = {
        ...validateFields.data,
        lotes_id: lotes_id
    };

    const processo = await api.post("/processop", payload);

    revalidatePath("/private/prefeitura")
    return processo;
}

export const fetchProcessos = async (): Promise<Processos[]> => {

    const processos: Processos[] = await api.get("/processop")

    return processos

}

export const fetchProcessosInativo = async (): Promise<Processos[]> => {

    const processos: Processos[] = await api.get("/processop/inativo")

    return processos

}

interface DataProps {
    atividades: Atividade[];
    cartorios: Cartorio[];
    lotes: Lote[];
    tipos: Tipo[]
}

export const fechData = async () => {

    const { atividades, cartorios, lotes, tipos }: DataProps = await api.get("/data/criar/prefeitura")

    return { atividades, cartorios, lotes, tipos }
}



export const closeProcesso = async (id: number, conclusao: string) => {

    const processo = await api.put(`processop/${id}/close`, { conclusao: conclusao })
    return processo
}


export const respondeProcessoLote = async (values: z.infer<typeof RespostaLoteSquema>, processo: ProcessoPrefeituraDetail) => {

    const dataAtual = new Date()
    const validateFields = RespostaLoteSquema.safeParse(values)

    if (!validateFields.success) {
        return null
    }

    const payload = {
        ...validateFields.data,
        processo_id: processo.id,
        processo_status: processo.status,
        data: dataAtual
    };



    const resposta = await api.post("processop/responde-lote", payload)
    revalidatePath("/private/cartorio")
    return resposta



}

export const respondeProcessoPessoa = async (values: z.infer<typeof RespostaPessoaSquema>, processo: ProcessoPrefeituraDetail) => {
    const dataAtual = new Date()
    const validateFields = RespostaPessoaSquema.safeParse(values)

    if (!validateFields.success) {
        return null
    }
    const payload = {
        ...validateFields.data,
        processo_id: processo.id,
        processo_status: processo.status,
        data: dataAtual
    };


    const resposta = await api.post("processop/responde-pessoa", payload)
    revalidatePath("/private/cartorio")
    return resposta

}