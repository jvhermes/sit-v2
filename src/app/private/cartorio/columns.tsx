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

import { deleteProcessoCartorio } from "@/actions/processoCartorio";



export type ProcessosCartorio = {
    id: number
    numero: string,
    tipo: string,
    proprietario: string,
    bairro: string,
    quadra: string,
    lote: string,
    criado: string,

}

async function deleteProcessoEvent(id: number | unknown) {

    const res = await deleteProcessoCartorio(id)
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
export const columnsCartorio: ColumnDef<ProcessosCartorio>[] = [
    {
        accessorKey: "id",
        header: "Ações",
        cell: (props) => (

            <div className="flex gap-2">
                <Link href={`/private/prefeitura/detalhes-c/${props.getValue()}`}>
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



]