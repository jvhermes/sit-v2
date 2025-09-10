"use server"
import { revalidatePath } from "next/cache"
import { format } from "date-fns"
import { ProcessosCartorio } from "@/app/private/cartorio/columns"
import { CreateProcessCartorioSquema } from "@/schemas/processCartorio"
import z from "zod"
import api from "@/lib/api"
import { Atividade, Cartorio, Lote, Setor, Tipo } from "@/types/types"

export const deleteProcessoCartorio = async (id: number | unknown) => {

    const cartorio = await api.delete(`/processoc/${id}`)

    return cartorio

}

export const closeProcessoCartorio = async (id: number) => {
    const processo = await api.put(`processoc/${id}/close`)
    return processo
}

export const fetchProcessosCartorio = async (): Promise<ProcessosCartorio[]> => {

    const processos: ProcessosCartorio[] = await api.get("/processop")

    return processos

}

export const fetchProcessosCartorioInativo = async (): Promise<ProcessosCartorio[]> => {

    const processos: ProcessosCartorio[] = await api.get("/processop/inativo")

    return processos

}


export const createProcessoCartorio = async (values: z.infer<typeof CreateProcessCartorioSquema>, lotes_id: Lote[]) => {

    const validateFields = CreateProcessCartorioSquema.safeParse(values)


    if (!validateFields.success) {
        return null
    }
    const payload = {
        ...validateFields.data,
        lotes_id: lotes_id
    };

    const processo = await api.post("/processoc", payload);


    revalidatePath("/private/cartorio")
    return processo;
}

interface DataProps {
    atividades: Atividade[];
    setores: Setor[];
    lotes: Lote[];
    tipos: Tipo[]
}

export const fechDataCartorio = async () => {

    const { atividades, setores, lotes, tipos }: DataProps = await api.get("/data/criar/cartorio")

    return { atividades, setores, lotes, tipos }
}