import { z } from "zod"

export const AdminCrudSquema = z.object({
    nome: z.string({
        required_error:"Nome é obrigatório"
    }).min(3,{message:"Mínimo de 3 carácteres"})
})