"use server"

import api from "@/lib/api"

import { revalidatePath } from "next/cache"


export const saveCSV = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);
    
    const res = await api.post("/csv",formData,{headers:{"Content-Type":"multipart/form-data"}})

    revalidatePath("/private/prefeitura/criar")
    revalidatePath("/private/cartorio/criar")

    return res

}


