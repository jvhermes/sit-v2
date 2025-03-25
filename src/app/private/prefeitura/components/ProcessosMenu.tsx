"use client"
import { ProcessTable } from "./ProcessosTable"
import { Button } from "@/components/ui/button"
import { Processos, columns } from "../columns"
import { useState } from "react"
import { ProcessCartorioTable } from "../../cartorio/components/ProcessosCartorioTable"
import { ProcessosCartorio, columnsCartorio } from "../../cartorio/columns"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
interface ProcessosMenuProps {
    processos: Processos[],
    processosCart: ProcessosCartorio[]
}

type ProcessoState = "recebidos" | "enviados"

export function ProcessosMenu({ processos, processosCart }: ProcessosMenuProps) {

    const processoList = processos
    const processoListCartorio = processosCart


    const [checked,setChecked] = useState(false)


    return (
        <div className="w-11/12  mt-12">

     
            <div className="py-3 flex justify-between">
                <div className="flex items-center space-x-2 ml-5">
                    <Switch id="enviados"  onCheckedChange={() => setChecked(!checked)} />
                    <Label htmlFor="enviados">Enviados</Label>
                </div>
                <Link href={"/private/prefeitura/criar"}>
                    <Button  >Novo Processo</Button>

                </Link>

            </div>

            <div className="my-3">
                {checked && (

                    <ProcessTable data={processoList} columns={columns} />

                )}
                {!checked && (
                    <ProcessCartorioTable data={processoListCartorio} columns={columnsCartorio} />
                )}
            </div>


        </div>
    )
}
