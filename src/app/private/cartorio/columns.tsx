"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye,Trash2} from "lucide-react"

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

export const columnsCartorio: ColumnDef<ProcessosCartorio>[] = [
    {
        id: "select",
        header:"Selecionar",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey:"numero",
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
        header: "Ações",
        cell: ({ row }) => (
           
            <div className="flex gap-2">
                <Button className="p-1 h-8 bg-purple-500 hover:bg-purple-400"><Eye /></Button>
                <Button className="p-1 h-8 bg-red-500 hover:bg-red-400"><Trash2 /></Button>
            </div>
        ),

    },

]