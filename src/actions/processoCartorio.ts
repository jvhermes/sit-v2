"use server"

import { revalidatePath } from "next/cache"
import { CreateProcessCartorioSquema } from "@/schemas/processCartorio"
import z from "zod"
import { Lote } from "@/types/types"
import { demoStore } from "@/data/demo-store"

export const deleteProcessoCartorio = async (id: number | unknown) => {
    return demoStore.deleteProcessoCartorio(id)
}

export const closeProcessoCartorio = async (id: number) => {
    const processo = demoStore.closeProcessoCartorio(id)
    revalidatePath("/private/cartorio")
    return { data: processo }
}

export const fetchProcessosCartorio = async () => {
    return demoStore.listProcessosCartorio(true)
}

export const fetchProcessosCartorioInativo = async () => {
    return demoStore.listProcessosCartorio(false)
}

export const getProcessoCartorio = async (id: string | number) => {
    return demoStore.getProcessoCartorio(id)
}

export const createProcessoCartorio = async (values: z.infer<typeof CreateProcessCartorioSquema>, lotes: Lote[]) => {
    const validateFields = CreateProcessCartorioSquema.safeParse(values)
    if (!validateFields.success) return null

    const payload = {
        ...validateFields.data,
        lotes_id: lotes.map((item) => item.id),
    }

    const processo = demoStore.createProcessoCartorio(payload, lotes)
    revalidatePath("/private/cartorio")
    return processo
}

export const fechDataCartorio = async () => {
    return demoStore.getCreateCartorioData()
}
