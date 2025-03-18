"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { handleNewNome,handleUpdateNome,handleDeleteNome } from "@/actions/admin"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AdminCrudSquema } from "@/schemas/admin"
import { toast } from "sonner"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  tipo: string
}


export function AdminTable<TData, TValue>({
  columns,
  data,
  tipo
}: DataTableProps<TData, TValue>) {


  const createForm = useForm<z.infer<typeof AdminCrudSquema>>({
    resolver: zodResolver(AdminCrudSquema),
  })

  const updateForm = useForm<z.infer<typeof AdminCrudSquema>>({
    resolver: zodResolver(AdminCrudSquema),
  })


  const [rowSelection, setRowSelection] = useState({})


  const router = useRouter()

  const [updateOpen, setUpdateOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    getRowId: (row: any) => row.id,
    state: {
      rowSelection,
    },
    defaultColumn: {
      size: 100
    }
  })
  function openAdd() {
    setAddOpen(!addOpen)
    setUpdateOpen(false)
    createForm.reset()
  }
  
  function openUpdate() {
    setAddOpen(false)
    setUpdateOpen(!updateOpen)
    updateForm.reset()
  }
  const handleNewAdmin = async (values: z.infer<typeof AdminCrudSquema>) => {
   
    const res = await handleNewNome(tipo, values.nome)
    if (!res) {
      toast.error("Este nome já foi utilizado",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })
    } else {
      toast.success("Adicionado com sucesso",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })
    }

    
  }

  const handleUpdateAdmin = async (values: z.infer<typeof AdminCrudSquema>) => {

    if(!table.getSelectedRowModel().rows?.[0]?.id){
      toast.error("Nenhum campo selecionado",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })

      return
    }
    const res = await handleUpdateNome(tipo, values.nome,table.getSelectedRowModel().rows?.[0]?.id)

    if (!res) {
      toast.error("Este nome já foi utilizado",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })
    } else {
      toast.success("Atualizado com sucesso",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })
    }
  }

  const handleDeleteAdmin = async () => {

    const res = await handleDeleteNome(tipo, table.getSelectedRowModel().rows?.[0]?.id)

  
    if (!res) {
      toast.error("Este campo está sendo utilizado em algum processo",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })
    } else {
      toast.success("Excluido com sucesso",{
        duration: 3000,
        classNames:{
          toast:"text-base"
        }
      })

      table.setRowSelection({})
      setUpdateOpen(false)
      setAddOpen(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between py-3">

        {(tipo === "Usuário") && (
          <div>
            {(table.getRowCount() > 1) &&
              (<Button onClick={() => router.push(`/private/admin/usuario/${table.getSelectedRowModel().rows?.[0]?.id}`)} disabled={!table.getIsSomeRowsSelected()} variant={"outline"}>Visualizar</Button>
              ) || (
                <Button onClick={() => router.push(`/private/admin/usuario/${table.getSelectedRowModel().rows?.[0]?.id}`)} disabled={!table.getIsAllRowsSelected()} variant={"outline"}>Visualizar</Button>
              )
            }
          </div>
        ) || (
            <div>
              {(table.getRowCount() > 1) &&
                (<div className="space-x-2">
                  <Button disabled={!table.getIsSomeRowsSelected()} onClick={() => openUpdate()} variant={"outline"}>Editar</Button>
                  <Button disabled={!table.getIsSomeRowsSelected()} onClick={() => handleDeleteAdmin()}  className="text-red-500" variant={"outline"}>Excluir</Button>
                  </div>
                ) || (
                  <div className="space-x-2">
                  <Button disabled={!table.getIsAllRowsSelected()} onClick={() => openUpdate()} variant={"outline"}>Editar</Button>
                  <Button disabled={!table.getIsAllRowsSelected()} onClick={() => handleDeleteAdmin()}  className="text-red-500" variant={"outline"}>Excluir</Button>
                  </div>
                 
                )
              }

            </div>
          )}
        {(tipo === "Usuário") && (
          <div>
            <Button onClick={() => router.push(`/private/admin/usuario/criar`)} variant={"outline"}>Adicionar</Button>

          </div>
        ) || (
            <div>
              <Button variant={"outline"} onClick={() => openAdd()} >Adicionar</Button>
            </div>
          )}
      </div>
      {(updateOpen )&&(
        <div >
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(handleUpdateAdmin)} className="flex items-end gap-4 py-4 ">
              <FormField name="nome" control={updateForm.control} render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <div>
                  <FormLabel>
                    Atualizar nome:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-[400px]"

                      {...field}
                    />
                  </FormControl>
                  </div>
            
                  <FormMessage />
          
                </FormItem>
              )}>
              </FormField>
              <Button  type="submit">Salvar</Button>

            </form>
          </Form>
        </div>
      )}
      {addOpen && (
        <div>
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(handleNewAdmin)} className="flex  items-end gap-4 py-4 ">
              <FormField name="nome" control={createForm.control} render={({ field }) => (
                <FormItem  className="flex items-center gap-3">
                  <div>
                  <FormLabel htmlFor="name">
                    Novo nome:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      className="w-[400px]"
                      {...field}
                    />
                  </FormControl>
                  </div>
                  <FormMessage />
        
                </FormItem>
              )}>
              </FormField>

              <Button type="submit">Salvar</Button>

            </form>
          </Form>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
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
  )
}
