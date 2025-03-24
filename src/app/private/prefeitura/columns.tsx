"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { toast } from "sonner";

import { deleteProcesso } from "@/actions/processo";


export type Processos = {
    id: number
    numero: string,
    tipo: string,
    proprietario: string,
    bairro: string,
    quadra: string,
    lote: string,
    criado: string,
    prazo: string,
    status: string
}

async function deleteProcessoEvent(id:number | unknown) {

    const res = await deleteProcesso(id)
    if (!res) {
      toast.error("Erro ao excluir Processo", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    } else {
      toast.success("Processo excluido com sucesso", {
        duration: 3000,
        classNames: {
          toast: "text-base"
        }
      })
    }
}
export const columns: ColumnDef<Processos>[] = [

    {
        accessorKey: "id",
        header: "Ações",
        cell: (props) => (

            <div className="flex gap-2">
                <Link href={`/private/prefeitura/detalhes-p/${props.getValue()}`}>
                    <Button className="p-1 h-8 bg-purple-500 hover:bg-purple-500/90"><Eye /></Button>
                </Link>
                <div >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="p-1 h-8" variant={"destructive"}><Trash2 /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmar Exclusão</DialogTitle>
                                <DialogDescription>
                                    <div className="flex flex-col">
                                        <p>As informações e documentos serão excluidos</p>
                                        <Button className="my-3 w-1/2 mx-auto" onClick={() => deleteProcessoEvent(props.getValue())} variant={"destructive"}>Cancelar Envio</Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        ),

    },
    {
        accessorKey: "numero",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Número
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "tipo",
        header: "Tipo de Processo",

    },

    {
        accessorKey: "proprietario",
        header: "Propietário",
    },
    {
        accessorKey: "bairro",
        header: "Bairro",
    },
    {
        accessorKey: "quadra",
        header: "Quadra",
    },
    {
        accessorKey: "lote",
        header: "Lote",
    },
    {
        accessorKey: "criado",
        header: "Criado em",
    },
    {
        accessorKey: "prazo",
        header: "Prazo",
    },
    {
        accessorKey: "status",
        header: "Status",

        cell: (props) => {
            const value = props.getValue()
            if (value === 'pendente') {
                return <span className="bg-gray-200 px-5 py-2 rounded ">Pendente</span>
            }
            if (value === 'respondido') {
                return <span className="bg-green-700 px-3 py-2 rounded text-white">Respondido</span>
            }
            if (value === 'atrasado') {
                return <span className="bg-red-700 px-[1.35rem] py-2 rounded text-white">Atrasado</span>
            }
            if (value === 'respondido_com_atraso') {
                return <span className="bg-yellow-600 px-3 text-white py-2 rounded">Respondido</span>
            }
        }

    },

]