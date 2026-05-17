"use server"

import { revalidatePath } from "next/cache"

export const saveCSV = async (file: File) => {
    revalidatePath("/private/prefeitura/criar")
    revalidatePath("/private/cartorio/criar")

    return {
        ok: true,
        message: `Arquivo ${file.name} recebido na demo. A importação persistente fica desabilitada nesta versão.`,
    }
}
