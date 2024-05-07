import { z } from "zod"
import { Tipo } from "@prisma/client"

export const CreateProcessCartorioSquema = z.object({
    num_processo: z.string({
        required_error:"Campo Obrigatório"
    }).min(1,"Campo Obrigatório"),

    texto : z.string(),
    atividade : z.string({
        required_error:"Campo Obrigatório"
    }),
    setor : z.string({
        required_error:"Campo Obrigatório"
    }),
    tipo: z.nativeEnum(Tipo,{
        required_error:"Campo Obrigatório"
    }),
    ano :z.string().min(2,{message:"Campo Obrigatório"}),
    pdf :z
    .unknown()
    .optional()
    .transform((value) => {
      return value as File | null | undefined;
    }),
    descricao_lotes:z.array(z.object({
        lote:z.string(),
        area:z.string(),
        testada:z.string()
    })).optional(),
    descricao_pessoas:z.array(z.object({
        nome:z.string(),
        telefone:z.string(),
        cpf:z.string(),
        email:z.string(),
    })).optional(),

})