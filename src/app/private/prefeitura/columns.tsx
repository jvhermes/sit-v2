"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

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

export const columns: ColumnDef<Processos>[] = [

    {
        accessorKey: "id",
        header: "Ações",
        cell: (props) => (

            <div className="flex gap-2">
                <Link href={`/private/prefeitura/detalhes-p/${props.getValue()}`}>
                    <Button className="p-1 h-8 bg-purple-500 hover:bg-purple-400"><Eye /></Button>
                </Link>
                <Button className="p-1 h-8 bg-red-500 hover:bg-red-400"><Trash2 /></Button>
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