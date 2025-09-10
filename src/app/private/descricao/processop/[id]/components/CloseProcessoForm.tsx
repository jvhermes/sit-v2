"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

import { CloseProcessoSquema} from '@/schemas/process'

import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"
import { ProcessoPrefeituraDetail } from "@/types/types"
import {closeProcesso } from "@/actions/processo"
import { toast } from "sonner"

type FormProps = {

    processo: ProcessoPrefeituraDetail
}
export function CloseProcessoForm({ processo }: FormProps) {


    const form = useForm<z.infer<typeof CloseProcessoSquema>>({
        resolver: zodResolver(CloseProcessoSquema),
        defaultValues: {
            conclusao:""
        }
    })

    const handleLoteSubmit = async (values: z.infer<typeof CloseProcessoSquema>) => {
        const res = await closeProcesso(processo.id,values.conclusao)
        if (!res) {
            toast.error("Erro ao encerrar Processo", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        } else {
            toast.success("Processo finalizado", {
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
 
                <div className="my-4">

                    <FormField name="conclusao" control={form.control} render={({ field }) => (
                        <FormItem >
                            <FormControl>
                                <Textarea
                                    placeholder="Observações Finais"
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