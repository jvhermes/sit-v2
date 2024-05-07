import { z } from "zod"
import { Tipo } from "@prisma/client"


export const CreateProcessSquema = z.object({
    num_processo: z.string({
        required_error: "Campo Obrigatório"
    }).min(1, "Campo Obrigatório"),
    prazo: z.date({
        required_error: "Campo Obrigatório"
    }).min(new Date(), { message: "Prazo não pode ser anterior a hoje" }),
    texto: z.string(),
    atividade: z.string({
        required_error: "Campo Obrigatório"
    }),
    cartorio: z.string({
        required_error: "Campo Obrigatório"
    }),
    tipo: z.nativeEnum(Tipo, {
        required_error: "Campo Obrigatório"
    }),
    ano: z.string().min(2, { message: "Campo Obrigatório" }),
    pdf: z
        .unknown()
        .optional()
        .transform((value) => {
            return value as File | null | undefined;
        }),
    descricao_lotes: z.array(z.object({
        lote: z.string(),
        area: z.string(),
        testada: z.string()
    })).optional(),
    descricao_pessoas: z.array(z.object({
        nome: z.string(),
        telefone: z.string(),
        cpf: z.string(),
        email: z.string(),
    })).optional(),

})

export const CloseProcessoSquema = z.object({
    conclusao: z.string()
})

export const RespostaLoteSquema = z.object({
    texto: z.string(),
    alvara:z.string().optional(),
    descricao: z.array(z.object({
       matricula: z.string({
            required_error: "Campo Obrigatório"
        }).min(1, "Campo Obrigatório"),
        data_registro: z.date({
            required_error: "Campo Obrigatório",
            invalid_type_error:"Campo Obrigatório"
        }),
        transcricao: z.string({
            required_error: "Campo Obrigatório"
        }).min(1, "Campo Obrigatório"),
        lote:z.string(),
        descricao_id:z.string(),
    }))
    
})

export const RespostaPessoaSquema = z.object({
    texto: z.string(),
    alvara:z.string().optional()
})