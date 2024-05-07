"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RespostaPessoaSquema } from '@/schemas/process'

import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"
import { ProcessoPrefeitura } from "@prisma/client"
import { respondeProcessoPessoa } from "@/actions/processo"
import { toast } from "sonner"

type FormProps = {

    processo: ProcessoPrefeitura
}
export function RespostaPessoaForm({ processo }: FormProps) {


    const form = useForm<z.infer<typeof RespostaPessoaSquema>>({
        resolver: zodResolver(RespostaPessoaSquema),
        defaultValues: {
            texto: "",
            alvara:""
        }
    })

    const handleLoteSubmit = async (values: z.infer<typeof RespostaPessoaSquema>) => {
        const res = await respondeProcessoPessoa(values,processo)
        if (!res) {
            toast.error("Erro ao enviar resposta", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        } else {
            toast.success("Resposta enviada", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        }
       form.reset()
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoteSubmit)} className="p-5 rounded  mb-5 border flex flex-col " >
                {processo.status === "ATRASADO" && (

                    <div>
                        <p className="py-2">O Processo está atrasado, informe o alvará de permissão para o envio de resposta</p>
                        <FormField name={`alvara`} control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input placeholder="Alvará de permissão" type="text" {...field} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>
                    </div>
                )}
                <div className="my-4">

                    <FormField name="texto" control={form.control} render={({ field }) => (
                        <FormItem >
                            <FormControl>
                                <Textarea
                                    placeholder="Observações de Resposta"
                                    className="resize-none h-[120px] w-full"
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )
                    }>
                    </FormField>
                </div>
                <Button className="m-auto" type="submit"> Enviar</Button>
            </form>
        </Form>

    )

}