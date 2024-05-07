import { z } from "zod"

export const CreateUserSchema = z.object({
    email: z.string({
        required_error: "Campo email é obrigatório",
    }).email({ message: 'Email inválido' }),
    senha: z.string({
        required_error: "Campo senha é obrigatório",
    }).min(6, { message: 'Mínimo de 6 caracteres' }),
    nome:z.string({
        required_error: "Campo nome é obrigatório",
    }),
    perfil:z.enum(["ADMIN","PREFEITURA","CARTORIO"],{
        required_error:"Campo perfil é obrigatório"
    }),
    avatar: z.string({
        required_error: "Selecione algum avatar",
    }),
    ativo:z.boolean(),
    cartorio_id:z.string().optional(),
    setor_id:z.string().optional(),
})


export const LogUserSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    senha: z.string().min(2, { message: 'Mínimo de 6 caracteres' }),
})
