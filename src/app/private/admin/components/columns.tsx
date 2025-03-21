"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Tipo } from "@prisma/client"

type AdminTableType = {
    id: string,
    nome: string
}

type TipoTableType = {
    id:string,
    nome:string,
    tipo:Tipo
}

export type UserTableType = {
    id: string,
    nome: string,
    email: string,
    avatar: string,
    local: string,
    ativo: string,
    tipo: string
}

export const adminColumns: ColumnDef<AdminTableType>[] = [
    {
        id: "select",
        header: "Selecionar",
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
        accessorKey: "nome",
        header: "Nome",
   
    }
]

export const tipoColumns: ColumnDef<TipoTableType>[] = [
    {
        id: "select",
        header: "Selecionar",
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
        accessorKey: "nome",
        header: "Nome",
   
    }
]

export const usuariosColumns: ColumnDef<UserTableType>[] = [
    {
        id: "select",
        header: "Selecionar",
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
        accessorKey: "nome",
        header: "Nome",

    },
    {
        accessorKey: "email",
        header: "Email",

    },
    {
        accessorKey: "tipo",
        header: "Tipo de perfil",

    },
    {
        accessorKey: "local",
        header: "Trabalha em",

    },
    {
        accessorKey: "ativo",
        header: "Status",
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: (props) => {
            const value = props.getValue()
            return (
                < Avatar >
                    <AvatarImage src={`/avatar${value}.png`} alt="avatar" />
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar >
            )
        }
    },

]