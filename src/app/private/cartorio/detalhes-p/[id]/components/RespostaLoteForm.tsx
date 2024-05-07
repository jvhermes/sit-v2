"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { RespostaLoteSquema, RespostaPessoaSquema } from '@/schemas/process'
import { DescricaoAprovacao } from "../page"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from '@/components/ui/textarea'
import { Button } from "@/components/ui/button"
import { ProcessoPrefeitura } from "@prisma/client"
import { respondeProcessoLote } from "@/actions/processo"
import { toast } from "sonner"

type FormProps = {
    descricaoRespostaList: DescricaoAprovacao[],
    processo: ProcessoPrefeitura
}

export function RespostaLoteForm({ descricaoRespostaList, processo }: FormProps) {


    const formLote = useForm<z.infer<typeof RespostaLoteSquema>>({
        resolver: zodResolver(RespostaLoteSquema),
        defaultValues: {
            texto: "",
            descricao: descricaoRespostaList,
            alvara: ""
        }
    })
    const { fields: fieldsLotes } = useFieldArray({
        name: "descricao",
        control: formLote.control
    })
    const handleLoteSubmit = async (values: z.infer<typeof RespostaLoteSquema>) => {
        const res = await respondeProcessoLote(values, processo)
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
        formLote.reset()
    }
    return (

        <Form {...formLote}>
            <form onSubmit={formLote.handleSubmit(handleLoteSubmit)} className="p-5 rounded  mb-5 border flex flex-col " >
                <div className="my-3">
                    <p className="py-2">Novos Registros:</p>
                    <Table className="border">
                        <TableHeader >
                            <TableRow>
                                <TableHead>Lote</TableHead>
                                <TableHead>Matrícula</TableHead>
                                <TableHead>Data de Registro</TableHead>
                                <TableHead>Trancrição</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {fieldsLotes.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="w-[200px]">
                                            <p >{item.lote}</p>
                                        </TableCell>
                                        <TableCell>
                                            <FormField name={`descricao.${index}.matricula`} control={formLote.control} render={({ field }) => (
                                                <FormItem >
                                                    <FormControl>
                                                        <Input className="w-[270px]" type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />

                                                </FormItem>
                                            )
                                            }>

                                            </FormField>
                                        </TableCell>
                                        <TableCell>
                             
                                            <FormField name={`descricao.${index}.data_registro`} control={formLote.control} render={({ field }) => (
                                                <FormItem className="flex flex-col mt-2.5">
                                            
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[270px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                    type="button"
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "dd/MM/yyy")
                                                                    ) : (
                                                                        <span>Escolha uma data</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />

                                                </FormItem>

                                            )
                                            }>
                                            </FormField>
                                        </TableCell>
                                        <TableCell>
                                            <FormField name={`descricao.${index}.transcricao`} control={formLote.control} render={({ field }) => (
                                                <FormItem >
                                                    <FormControl>
                                                        <Input className="w-[270px]" type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />

                                                </FormItem>
                                            )
                                            }>
                                            </FormField>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </div>
                {processo.status === "ATRASADO" && (

                    <div>
                        <p className="py-2">O Processo está atrasado, informe o alvará de permissão para o envio de resposta</p>
                        <FormField name={`alvara`} control={formLote.control} render={({ field }) => (
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
                    <p className="py-2">Observações:</p>
                    <FormField name="texto" control={formLote.control} render={({ field }) => (
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