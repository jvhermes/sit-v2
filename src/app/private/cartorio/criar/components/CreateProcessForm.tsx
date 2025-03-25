"use client"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { FaMinus } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaPlus } from "react-icons/fa";
import { useState, useRef, useCallback, ChangeEvent } from "react";
import { CreateProcessCartorioSquema } from "@/schemas/processCartorio";
import { Atividade, Lote, Setor, TipoDeProcesso } from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from "@/components/ui/command"

import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

import { createProcessoCartorio } from "@/actions/processoCartorio";

type CreateProcessProps = {
    atividades: Atividade[]
    setores: Setor[]
    tipos: TipoDeProcesso[]
    lotes: Lote[]
}


export function CreateProcessForm({ atividades, setores, lotes, tipos }: CreateProcessProps) {

    const [bairro, setBairro] = useState("")
    const [quadra, setQuadra] = useState("")
    const [insc_imob, setInscImob] = useState("")
    const [codigo, setCodigo] = useState("")
    const [lote_id, setLote_id] = useState("")


    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Lote[]>([]);
    const [inputValue, setInputValue] = useState("");


    const bairros = lotes.map((item) => {
        return item.bairro
    })



    const inscs = lotes.map((item) => {
        return item.insc_imob
    })
    const codigos = lotes.map((item) => {
        return item.codigo_imovel
    })

    const quadrasPorBairro = lotes.filter((item) => {

        const searchBairro = bairro;
        const bair = item.bairro;

        return searchBairro && bair && bair.includes(searchBairro);
    })

    const quadras = quadrasPorBairro.map((item) => {
        return item.quadra
    })

    const loteInfos = lotes.filter((item) => (item.id === parseInt(lote_id)))

    const filtredQuadra = quadras.filter((item, index) => {

        return quadras.indexOf(item) === index && item
    }).sort();



    const filteredBairros = bairros.filter((item, index) => {
        return bairros.indexOf(item) === index && item
    }).sort();

    const filtredLotes = lotes.filter((item) => {

        const searchBairro = bairro;
        const bair = item.bairro;

        const searchQuadra = quadra;
        const qua = item.quadra;

        const searchinsc = insc_imob;
        const inscri = item.insc_imob;

        const searchcod = codigo;
        const cod = item.codigo_imovel;

        if (searchinsc) {
            return inscri && inscri.includes(searchinsc)
        }

        if (searchcod) {
            return cod && cod.includes(searchcod)
        }

        return searchBairro && bair.includes(searchBairro) && searchQuadra && qua.includes(searchQuadra);

    })


    const handleUnselect = useCallback((lote: Lote) => {
        setSelected(prev => prev.filter(s => s.lote !== lote.lote));
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    setSelected(prev => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    })
                }
            }

            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, []);

    const selectables = filtredLotes.filter(item => !selected.includes(item));

    const form = useForm<z.infer<typeof CreateProcessCartorioSquema>>({
        resolver: zodResolver(CreateProcessCartorioSquema),
        defaultValues: {
            num_processo: "",
            ano: new Date().getFullYear().toString(),
            texto: "",
            tipo:'1',
            descricao_lotes: [{ lote: "", area: "", testada: "" }],
            descricao_pessoas: [{ nome: "", cpf: "", email: "", telefone: "" }]
        }
    })


    const { append: appendLotes, fields: fieldsLotes, remove: removeLotes } = useFieldArray({
        name: "descricao_lotes",
        control: form.control
    })

    const { append: appendPessoa, fields: fieldsPessoa, remove: removePessoa } = useFieldArray({
        name: "descricao_pessoas",
        control: form.control
    })

    const handleChangeCod = (event: ChangeEvent<HTMLInputElement>) => {
        setCodigo(event.target.value)
    }
    const handleChangeInsc = (event: ChangeEvent<HTMLInputElement>) => {
        setInscImob(event.target.value)
    }

    const appendLotesFunc = () => {
        if (fieldsLotes.length > 9) {
            return
        }
        appendLotes({ lote: "", area: "", testada: "" })
    }

    const removeLotesFunc = () => {
        if (fieldsLotes.length <= 1) {
            return
        }
        removeLotes(fieldsLotes.length - 1)
    }

    const appendPessoaFunc = () => {
        if (fieldsLotes.length > 9) {
            return
        }
        appendPessoa({ email: "", nome: "", cpf: "", telefone: "" })
    }

    const removePessoaFunc = () => {
        if (fieldsLotes.length <= 1) {
            return
        }
        removePessoa(fieldsLotes.length - 1)
    }
    const tipoState = form.watch("tipo")
    const fileRef = form.register("pdf");

    const handleSubmit = async (values: z.infer<typeof CreateProcessCartorioSquema>) => {


        const lote_ids = values.tipo === '1' ? loteInfos : selected

        const res = await createProcessoCartorio(values, lote_ids)

        if (!res) {
            toast.error("Erro nos campos ou Número de Processo já utilizado", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        } else {

            toast.success("Processo adicionado com sucesso", {
                duration: 3000,
                classNames: {
                    toast: "text-base"
                }
            })
        }
        form.reset()
    }

    return (
        <div>

            <div className="py-6 ">
                <Link href={"/private/cartorio"}>
                    <Button variant={"outline"} className="bg-white hover:bg-gray-50">Retornar</Button>
                </Link>

            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-10 rounded bg-white flex-col mb-5 border flex  gap-6 " >
                    <h2 className="text-lg">Dados:</h2>
                    <div className="flex gap-6 flex-wrap py-5 ">
                        <FormField name="num_processo" control={form.control} render={({ field }) => (
                            <FormItem className="" >
                                <FormLabel>Número do Processo</FormLabel>
                                <FormControl>
                                    <Input className="w-[270px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }>
                        </FormField>
                        <FormField name="ano" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Ano</FormLabel>
                                <FormControl>
                                    <Input className="w-[270px]" type="text" {...field} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>

                        <FormField name="atividade" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Atividade</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[270px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {atividades.map((item) => {
                                            return (
                                                <SelectItem key={item.id} value={item.id}>{item.nome}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>
                        <FormField name="tipo" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Tipo de Processo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toLocaleString()}>
                                    <FormControl>
                                        <SelectTrigger className="w-[270px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {tipos.map((item) => {
                                            return (
                                                <SelectItem key={item.id} value={item.id.toLocaleString()}>{item.nome}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>
                    </div>

                    <h2 className="text-lg">Filtrar Lotes:</h2>
                    <div className="grid  grid-flow-row sm:grid-flow-col space-x-4 space-y-4 sm:space-y-0">
                        <div className="col-span-3" >
                            <Card >
                                <CardContent className="grid grid-flow-row sm:grid-flow-col pt-5 ">
                                    <div className="col-span-1">
                                        <Select value={bairro} onValueChange={setBairro} disabled={insc_imob !== "" || codigo !== "" || selected.length > 0 || loteInfos.length > 0}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Bairros" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {filteredBairros.map((item, index) => {

                                                        return (
                                                            <SelectItem value={item} key={index}>{item}</SelectItem>
                                                        )

                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-1 ">
                                        <Select value={quadra} onValueChange={setQuadra} disabled={insc_imob !== "" || codigo !== "" || selected.length > 0 || loteInfos.length > 0}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Quadras" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {filtredQuadra.map((item, index) => {
                                                        if (bairro) {
                                                            return (
                                                                <SelectItem value={item} key={index}>{item}</SelectItem>
                                                            )
                                                        }
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-span-2">
                            <Card className=" pt-5">
                                <CardContent>

                                    <Input placeholder="Código do Imóvel" type="search" id="cod" list="codigos" disabled={insc_imob !== ""} value={codigo} onChange={handleChangeCod} />
                                    <datalist id="codigos" className="max-h-48 overflow-y-auto">
                                        {codigos.map((item, index) => {

                                            return (
                                                <option key={index} value={item}></option>
                                            )

                                        })}
                                    </datalist>
                                </CardContent>

                            </Card>
                        </div>
                        <div className="col-span-2">
                            <Card className=" pt-5">
                                <CardContent>
                                    <Input type="search" list="insc" placeholder="Insc. Imobiliária" id="insc_imob" disabled={codigo !== ""} value={insc_imob} onChange={handleChangeInsc} />
                                    <datalist id="insc" >
                                        {inscs.map((item, index) => {

                                            return (
                                                <option key={index} value={item}></option>
                                            )

                                        })}
                                    </datalist>
                                </CardContent>
                            </Card>


                        </div>

                    </div>
                    <div>
                        {tipoState === '1' && (
                            <div>
                                <div className="mb-4">
                                    <Select value={lote_id} onValueChange={setLote_id} >
                                        <SelectTrigger >
                                            <SelectValue placeholder="Lotes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>

                                                <Button
                                                    className="w-full h-[25px] px-2"
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setLote_id("")
                                                    }}
                                                    type="button"
                                                >
                                                    Limpar
                                                </Button>

                                                {filtredLotes.map((item) => {
                                                    if (item.insc_imob === insc_imob && insc_imob !== "") {
                                                        return (
                                                            <SelectItem value={item.id.toString()} key={item.id}>{item.lote}</SelectItem>
                                                        )
                                                    }
                                                    if (item.codigo_imovel === codigo && codigo !== "") {
                                                        return (
                                                            <SelectItem value={item.id.toString()} key={item.id}>{item.lote}</SelectItem>
                                                        )
                                                    }
                                                    if (item.quadra === quadra && item.bairro === bairro && insc_imob === "" && codigo === "") {
                                                        return (
                                                            <SelectItem value={item.id.toString()} key={item.id}>{item.lote}</SelectItem>
                                                        )
                                                    }

                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {loteInfos.map((item, index) => {
                                    return (
                                        <div key={index} className="my-2">
                                            <Card>
                                                <CardContent className="p-4">
                                                    <span className="px-3"> Lote:  {item.lote}</span>
                                                    <span className="px-3">Testada:  {item.testada}</span>
                                                    <span className="px-3">Area: {item.area_total}</span>
                                                    <span className="px-3"> Matrícula: {item.matricula || "não informada"}</span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                })}

                            </div>
                        ) || (
                                <div>
                                    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent mb-4">
                                        <div
                                            className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                                        >
                                            <div className="flex gap-1 flex-wrap">
                                                {selected.map((item) => {
                                                    return (
                                                        <Badge key={item.id} variant="secondary">
                                                            {item.lote}
                                                            <button
                                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        handleUnselect(item);
                                                                    }
                                                                }}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                onClick={() => handleUnselect(item)}
                                                                type="button"
                                                            >
                                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />

                                                            </button>
                                                        </Badge>
                                                    )
                                                })}
                                                {/* Avoid having the "Search" Icon */}
                                                <CommandPrimitive.Input
                                                    ref={inputRef}
                                                    value={inputValue}
                                                    onValueChange={setInputValue}
                                                    onBlur={() => setOpen(false)}
                                                    onFocus={() => setOpen(true)}
                                                    placeholder="Lotes"
                                                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative mt-2">
                                            {open && selectables.length > 0 ?
                                                <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                                    <CommandGroup className="h-full overflow-auto">
                                                        <CommandList>
                                                            {selectables.map((item) => {
                                                                return (
                                                                    <CommandItem
                                                                        key={item.id}
                                                                        onMouseDown={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                        }}
                                                                        onSelect={(value) => {
                                                                            setInputValue("")
                                                                            setSelected(prev => [...prev, item])
                                                                        }}
                                                                        className={"cursor-pointer"}
                                                                    >
                                                                        {item.lote}
                                                                    </CommandItem>
                                                                );
                                                            })}
                                                        </CommandList>
                                                    </CommandGroup>
                                                </div>
                                                : null}
                                        </div>
                                    </Command >

                                    {selected.map((item, index) => {
                                        return (
                                            <div key={index} className="my-2">
                                                <Card>
                                                    <CardContent className="p-4">
                                                        <span className="px-3">{` Lote:  ${item.lote}`}</span>
                                                        <span className="px-3">{`Testada:  ${item.testada}`}</span>
                                                        <span className="px-3">{`Area: ${item.area_total}`}</span>
                                                        <span className="px-3"> {`Matrícula: ${item.matricula || " não informada"}`}</span>
                                                    </CardContent>
                                                </Card>

                                            </div>
                                        )
                                    })}

                                </div>
                            )}
                    </div>

                    {tipoState === '2' && (
                        <> <h2 className="text-lg">Novas Descrições:</h2>
                            <div>
                                <Table className="border">
                                    <TableHeader >
                                        <TableRow>
                                            <TableHead>Lote</TableHead>
                                            <TableHead>Area</TableHead>
                                            <TableHead>Testada</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <FormField name={`descricao_lotes.${0}.lote`} control={form.control} render={({ field }) => (
                                                    <FormItem >
                                                        <FormControl>
                                                            <Input className="w-[270px]" placeholder='ex: "00-X"' type="text" {...field} />
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                                }>

                                                </FormField>
                                            </TableCell>
                                            <TableCell>
                                                <FormField name={`descricao_lotes.${0}.area`} control={form.control} render={({ field }) => (
                                                    <FormItem >

                                                        <FormControl>
                                                            <Input className="w-[270px]" placeholder='ex: "000.00"' type="text" {...field} />
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                                }>

                                                </FormField>
                                            </TableCell>
                                            <TableCell>
                                                <FormField name={`descricao_lotes.${0}.testada`} control={form.control} render={({ field }) => (
                                                    <FormItem >
                                                        <FormControl>
                                                            <Input className="w-[270px]" type="text" {...field} placeholder='ex: "00.00"' />
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                                }>
                                                </FormField>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>
                            </div>
                        </>
                    )}
                    {tipoState === '1' && (
                        <> <h2 className="text-lg">Novas Descrições:</h2>
                            <div className="flex py-1 gap-3 items-center">
                                Adicionar Campos:
                                <Button onClick={appendLotesFunc} type="button"><FaPlus /></Button>
                                <Button onClick={removeLotesFunc} type="button"><FaMinus /></Button>
                            </div>
                            <div>
                                <Table className="border">
                                    <TableHeader >
                                        <TableRow>
                                            <TableHead>Lote</TableHead>
                                            <TableHead>Area</TableHead>
                                            <TableHead>Testada</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>


                                        {fieldsLotes.map((item, index) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <FormField name={`descricao_lotes.${index}.lote`} control={form.control} render={({ field }) => (
                                                            <FormItem >
                                                                <FormControl>
                                                                    <Input className="w-[270px]" placeholder='ex: "00-X"' type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />

                                                            </FormItem>
                                                        )
                                                        }>

                                                        </FormField>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormField name={`descricao_lotes.${index}.area`} control={form.control} render={({ field }) => (
                                                            <FormItem >

                                                                <FormControl>
                                                                    <Input className="w-[270px]" placeholder='ex: "000.00"' type="text" {...field} />
                                                                </FormControl>
                                                                <FormMessage />

                                                            </FormItem>
                                                        )
                                                        }>

                                                        </FormField>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormField name={`descricao_lotes.${index}.testada`} control={form.control} render={({ field }) => (
                                                            <FormItem >
                                                                <FormControl>
                                                                    <Input className="w-[270px]" type="text" {...field} placeholder='ex: "00.00"' />
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
                        </>
                    )}
                    {(tipoState !== '2' && tipoState !== '1') && (
                        <> <h2 className="text-lg">Novas Descrições:</h2>
                            <div className="flex py-1 gap-3 items-center">
                                Adicionar Campos:
                                <Button onClick={appendPessoaFunc} type="button"><FaPlus /></Button>
                                <Button onClick={removePessoaFunc} type="button"><FaMinus /></Button>
                            </div>

                            <div>
                                <Table className="border">
                                    <TableHeader >
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>CPF</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Telefone</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>

                                        {fieldsPessoa.map((item, index) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        <FormField name={`descricao_pessoas.${index}.nome`} control={form.control} render={({ field }) => (
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
                                                        <FormField name={`descricao_pessoas.${index}.cpf`} control={form.control} render={({ field }) => (
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
                                                        <FormField name={`descricao_pessoas.${index}.email`} control={form.control} render={({ field }) => (
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
                                                        <FormField name={`descricao_pessoas.${index}.telefone`} control={form.control} render={({ field }) => (
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
                        </>
                    )}



                    <FormField name="texto" control={form.control} render={({ field }) => (
                        <FormItem >
                            <FormControl>
                                <Textarea
                                    placeholder="Observações"
                                    className="resize-none h-[120px] w-full"
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )
                    }>
                    </FormField>
                    <h2 className="text-lg">Finalizar:</h2>
                    <div className=" mx-auto my-7 flex flex-wrap  items-cente gap-6">

                        <FormField name="pdf" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Anexar pdf</FormLabel>
                                <FormControl>
                                    <Input accept=".pdf" className="w-[270px]" type="file" {...fileRef} />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>

                        <FormField name="setor" control={form.control} render={({ field }) => (
                            <FormItem >
                                <FormLabel>Encaminhar para:</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[270px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {setores.map((item) => {
                                            return (
                                                <SelectItem key={item.id} value={item.id}>{item.nome}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />

                            </FormItem>
                        )
                        }>
                        </FormField>



                    </div>
                    <Button type="submit" className="m-auto w-[200px]">Enviar</Button>
                </form>
            </Form>
        </div>
    )
}
