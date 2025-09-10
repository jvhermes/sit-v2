import { z } from "zod"

export const CreateProcessCartorioSquema = z.object({
    num_processo: z.string({
        required_error:"Campo Obrigatório"
    }).min(1,"Campo Obrigatório"),

    observacao : z.string(),
    atividade_id : z.string({
        required_error:"Campo Obrigatório"
    }),
    setor_id : z.string({
        required_error:"Campo Obrigatório"
    }),
    tipo_id: z.string( {
        required_error: "Campo Obrigatório"
    }),
    ano :z.string().min(2,{message:"Campo Obrigatório"}),
    pdf :z
    .unknown()
    .optional()
    .transform((value) => {
      return value as File | null | undefined;
    }),
    descricao_lote:z.array(z.object({
        lote:z.string(),
        area:z.string(),
        testada:z.string()
    })).optional(),
    descricao_pessoa:z.array(z.object({
        nome:z.string(),
        telefone:z.string(),
        cpf:z.string(),
        email:z.string(),
    })).optional(),

})