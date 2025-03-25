"use client"
import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    SortingState,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"
import { useState } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from 'next/navigation'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function ProcessTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])

    let pathname = usePathname()
    let newPathname = pathname
    if (pathname.endsWith("encerrados")) {
        // Remove "encerrados" do final da string
        newPathname = pathname.substring(0, pathname.length - "encerrados".length);
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        enableMultiRowSelection: false,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row: any) => row.id,
        state: {
            columnFilters,
            rowSelection,
            sorting,
        }
    })


    return (
        <div >
  
            <div className="bg-white p-5 border">
                <div className="m-2">
                    <p>Filtros:</p>
                </div>
                <div className="flex items-center flex-wrap gap-2  py-4">

                    <Input
                        placeholder="N° do Processo "
                        value={(table.getColumn("numero")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("numero")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Proprietário "
                        value={(table.getColumn("proprietario")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("proprietario")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Bairro "
                        value={(table.getColumn("bairro")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("bairro")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Quadra"
                        value={(table.getColumn("quadra")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("quadra")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Lote "
                        value={(table.getColumn("lote")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("lote")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Criado em"
                        value={(table.getColumn("criado")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("criado")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Prazo final"
                        value={(table.getColumn("prazo")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("prazo")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />
                    <Input
                        placeholder="Status"
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("status")?.setFilterValue(event.target.value)
                        }
                        className="w-[250px]"
                    />

                </div>
                <Table className="rounded-md border">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-gray-200 text-gray-700">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum Processo Encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div >
    )
}
